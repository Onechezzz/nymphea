"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import { quizQuestions, DIFFICULTY_COUNTS } from "@/lib/staticQuiz";
import { avatarComments } from "@/lib/avatarComments";

type Lang = "en" | "el";
type Gender = "male" | "female" | "unisex";

// ── Scoring accumulator (tracked in a REF for synchronous access) ─────────────
interface Accumulator {
  facetSums: Record<string, number>;
  facetCounts: Record<string, number>;
  vibeSums: Record<string, number>;
  vibeCounts: Record<string, number>;
  tagCounts: Record<string, number>;
}

const FACET_KEYS = [
  "freshness",
  "sweetness",
  "warmth",
  "woodiness",
  "florality",
  "spiciness",
  "clean_musk",
  "powdery",
  "green",
  "citrus",
  "ambery",
];
const VIBE_KEYS = ["day_night", "formal_casual", "introvert_extrovert", "safe_provocative"];

function emptyAcc(): Accumulator {
  return { facetSums: {}, facetCounts: {}, vibeSums: {}, vibeCounts: {}, tagCounts: {} };
}

function addToAcc(
  prev: Accumulator,
  facets: Partial<Record<string, number>>,
  vibe: Partial<Record<string, number>>,
  tags: string[],
): Accumulator {
  const next: Accumulator = {
    facetSums: { ...prev.facetSums },
    facetCounts: { ...prev.facetCounts },
    vibeSums: { ...prev.vibeSums },
    vibeCounts: { ...prev.vibeCounts },
    tagCounts: { ...prev.tagCounts },
  };
  Object.entries(facets).forEach(([k, v]) => {
    if (v === undefined) return;
    next.facetSums[k] = (next.facetSums[k] || 0) + v;
    next.facetCounts[k] = (next.facetCounts[k] || 0) + 1;
  });
  Object.entries(vibe).forEach(([k, v]) => {
    if (v === undefined) return;
    next.vibeSums[k] = (next.vibeSums[k] || 0) + v;
    next.vibeCounts[k] = (next.vibeCounts[k] || 0) + 1;
  });
  tags.forEach((tag) => {
    next.tagCounts[tag] = (next.tagCounts[tag] || 0) + 1;
  });
  return next;
}

/** Convert accumulator → UserProfile expected by matchAromas() */
function buildProfile(acc: Accumulator, gender: Gender) {
  const facets: Record<string, number> = {};
  const vibe: Record<string, number> = {};
  const tags: string[] = [];

  FACET_KEYS.forEach((k) => {
    const cnt = acc.facetCounts[k] || 0;
    facets[k] = cnt > 0 ? (acc.facetSums[k] || 0) / cnt : 0.5;
  });
  VIBE_KEYS.forEach((k) => {
    const cnt = acc.vibeCounts[k] || 0;
    vibe[k] = cnt > 0 ? (acc.vibeSums[k] || 0) / cnt : 0.5;
  });
  // Repeat tags proportionally (tags with higher count appear more times → higher Jaccard weight)
  const maxTag = Math.max(...Object.values(acc.tagCounts), 1);
  Object.entries(acc.tagCounts).forEach(([tag, cnt]) => {
    const repeats = Math.round((cnt / maxTag) * 3);
    for (let i = 0; i < repeats; i++) tags.push(tag);
  });

  return { gender, facets, vibe, tags } as any;
}

// ── Central speech bubble ──────────────────────────────────────────────────────
function SpeechBubble({ text, visible, onSkip }: { text: string; visible: boolean; onSkip: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ivRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!visible || !text) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    ivRef.current = setInterval(() => {
      i++;
      if (i <= text.length) setDisplayed(text.slice(0, i));
      else {
        clearInterval(ivRef.current!);
        setDone(true);
      }
    }, 18);
    return () => {
      if (ivRef.current) clearInterval(ivRef.current);
    };
  }, [visible, text]);

  if (!visible || !text) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        onClick={onSkip}
        style={{
          background: "#fff",
          color: "#1a2e1e",
          borderRadius: "18px",
          padding: "11px 16px",
          fontSize: "0.83rem",
          fontWeight: 600,
          lineHeight: 1.5,
          maxWidth: "240px",
          minWidth: "130px",
          border: "2.5px solid #1a2e1e",
          boxShadow: "3px 3px 0 #1a2e1e, 0 6px 20px rgba(0,0,0,0.35)",
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {displayed}
        {!done && <span style={{ animation: "blink 0.7s step-end infinite", marginLeft: "1px" }}>|</span>}
        {done && <div style={{ fontSize: "0.65rem", color: "rgba(119,163,148,0.7)", marginTop: "4px" }}>tap to skip →</div>}
        <style jsx>{`
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

// ── Main quiz ─────────────────────────────────────────────────────────────────
function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lang = (searchParams.get("lang") || "en") as Lang;
  const gender = (searchParams.get("gender") || "unisex") as Gender;
  const difficulty = (searchParams.get("difficulty") || "easy") as keyof typeof DIFFICULTY_COUNTS;

  const totalQ = DIFFICULTY_COUNTS[difficulty] || 9;
  const questions = quizQuestions.slice(0, totalQ);

  // ── State ──────────────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answering, setAnswering] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [femaleTalking, setFemaleTalking] = useState(false);
  const [maleTalking, setMaleTalking] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // ── Refs (synchronous, no async React issues) ─────────────────────────────
  const accRef = useRef<Accumulator>(emptyAcc());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingAction = useRef<(() => void) | null>(null);

  const showFemale = gender !== "male";
  const showMale = gender !== "female";

  // ── Skip bubble ────────────────────────────────────────────────────────────
  const skipBubble = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowBubble(false);
    setFemaleTalking(false);
    setMaleTalking(false);
    if (pendingAction.current) {
      pendingAction.current();
      pendingAction.current = null;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && showBubble) {
        e.preventDefault();
        skipBubble();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showBubble, skipBubble]);

  // ── Intro bubble ──────────────────────────────────────────────────────────
  useEffect(() => {
    const key = `q1_${gender}` as keyof typeof avatarComments.en;
    const text = avatarComments[lang][key] || avatarComments[lang].greeting || "";
    setBubbleText(text);
    setShowBubble(true);
    setFemaleTalking(showFemale);
    setMaleTalking(showMale);
    pendingAction.current = () => {
      /* intro only */
    };
    timerRef.current = setTimeout(() => {
      setShowBubble(false);
      setFemaleTalking(false);
      setMaleTalking(false);
      pendingAction.current = null;
    }, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit: run matching entirely on frontend (fixes all backend format/endpoint bugs) ──
  const submitQuiz = useCallback(async () => {
    const acc = accRef.current;
    const profile = buildProfile(acc, gender);

    // Helper: resolve named export regardless of how the module is bundled
    const getMatchFn = (mod: any) =>
      typeof mod.matchAromas === "function"
        ? mod.matchAromas
        : (mod.default?.matchAromas as typeof import("@aroma/matching-engine").matchAromas);

    const runMatch = (matchFn: any, aromas: any[], profiles: any[]) => matchFn(profile, aromas, profiles ?? []);

    try {
      // Prefer fresh data from the backend snapshot endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/snapshot`);
      if (res.ok) {
        const snapshot = await res.json();
        const mod = await import("@aroma/matching-engine");
        const result = runMatch(getMatchFn(mod), snapshot.aromas, snapshot.profiles);
        sessionStorage.setItem("quiz_result", JSON.stringify(result));
        router.push("/quiz/results");
        return;
      }
    } catch {
      /* network unavailable, fall through */
    }

    // Offline: use IndexedDB cached snapshot
    try {
      const { getSnapshot } = await import("@/lib/db");
      const mod = await import("@aroma/matching-engine");
      const snapshot = await getSnapshot();
      if (snapshot?.aromas?.length) {
        const result = runMatch(getMatchFn(mod), snapshot.aromas, snapshot.profiles);
        sessionStorage.setItem("quiz_result", JSON.stringify(result));
        router.push("/quiz/results");
        return;
      }
    } catch {
      /* ignore */
    }

    router.push("/quiz/results");
  }, [gender, router]);

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const getComment = (qIndex: number, optIndex: number): string => {
    const key = `q${qIndex + 2}_opt${optIndex + 1}` as keyof typeof avatarComments.en;
    return avatarComments[lang][key] || avatarComments[lang].transition || "";
  };

  // ── Handle answer ──────────────────────────────────────────────────────────
  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (answering || transitioning) return;
      setAnswering(true);
      setSelectedOption(optionIndex);

      const option = currentQ.options[optionIndex];

      // Update accumulator SYNCHRONOUSLY via ref (no React async issues)
      accRef.current = addToAcc(accRef.current, option.facets || {}, option.vibe || {}, option.tags || []);

      const isLast = currentIndex >= questions.length - 1;

      const proceed = () => {
        setShowBubble(false);
        setFemaleTalking(false);
        setMaleTalking(false);
        setTransitioning(true);
        if (!isLast) {
          setTimeout(() => {
            setCurrentIndex((i) => i + 1);
            setSelectedOption(null);
            setAnswering(false);
            setTransitioning(false);
          }, 250);
        } else {
          submitQuiz();
        }
      };

      // Show avatar comment
      if (timerRef.current) clearTimeout(timerRef.current);
      setBubbleText(getComment(currentIndex, optionIndex));
      setShowBubble(true);
      setFemaleTalking(showFemale);
      setMaleTalking(showMale);

      pendingAction.current = proceed;
      timerRef.current = setTimeout(() => {
        pendingAction.current = null;
        proceed();
      }, 5000);
    },
    [answering, transitioning, currentQ, currentIndex, questions.length, showFemale, showMale, submitQuiz, lang],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentQ) return null;

  return (
    <div className="aroma-bg" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,0.08)", zIndex: 100 }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f17bab, #77a394)",
            transition: "width 0.5s ease",
            boxShadow: "0 0 8px rgba(241,123,171,0.6)",
          }}
        />
      </div>

      {/* Header */}
      <header style={{ padding: "18px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
        <button
          onClick={() => router.back()}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            borderRadius: "10px",
            padding: "8px 14px",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          ← {lang === "el" ? "Πίσω" : "Back"}
        </button>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nymphea-logo.png" alt="NYMPHEA" width={120} height={120} style={{ opacity: 0.8 }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(247,165,205,0.7)", fontWeight: 600 }}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        {showBubble ? (
          <button
            onClick={skipBubble}
            style={{
              background: "rgba(241,123,171,0.2)",
              border: "1px solid rgba(241,123,171,0.35)",
              color: "rgba(247,165,205,0.9)",
              borderRadius: "10px",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            Skip ⏭
          </button>
        ) : (
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              padding: "6px 12px",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {difficulty.toUpperCase()}
          </div>
        )}
      </header>

      {/* 3-column layout */}
      <main style={{ flex: 1, display: "flex", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
        {/* Female avatar */}
        <div
          className="hidden md:flex"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingRight: "5%",
            minHeight: "clamp(380px, 72vh, 780px)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <Avatar gender="female" visible={showFemale} talking={femaleTalking} side="left" />
          {/* Comic arrow → toward center, at face height */}
          {showBubble && showFemale && (
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                right: 0,
                bottom: "calc(0.81 * clamp(480px, 56vw, 720px))",
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              <svg width="74" height="26" viewBox="0 0 74 26" fill="none">
                <path d="M4,13 C24,3 50,3 66,13" stroke="#050d07" strokeWidth="7" strokeLinecap="round" />
                <path d="M62,5 L74,13 L62,21" stroke="#050d07" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M4,13 C24,3 50,3 66,13" stroke="rgba(255,255,255,0.82)" strokeWidth="3.5" strokeLinecap="round" />
                <path
                  d="M62,5 L74,13 L62,21"
                  stroke="rgba(255,255,255,0.88)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Center panel — vertically centered within avatar area */}
        <div
          style={{
            width: "100%",
            maxWidth: "clamp(340px, 44vw, 520px)",
            padding: "20px 16px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 10,
            alignSelf: "center",
          }}
        >
          {/* Central speech bubble */}
          {showBubble && <SpeechBubble text={bubbleText} visible={showBubble} onSkip={skipBubble} />}

          {/* Question */}
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "18px 22px" }}>
            <p
              style={{
                fontSize: "1.0rem",
                fontWeight: 600,
                lineHeight: 1.55,
                color: "rgba(247,165,205,0.95)",
                textAlign: "center",
                opacity: transitioning ? 0 : 1,
                transition: "opacity 0.25s ease",
              }}
            >
              {currentQ.question[lang]}
            </p>
          </div>

          {/* Options */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px", opacity: transitioning ? 0.3 : 1, transition: "opacity 0.25s" }}
          >
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answering || transitioning}
                style={{
                  background:
                    selectedOption === i
                      ? "linear-gradient(135deg, rgba(241,123,171,0.3), rgba(119,163,148,0.2))"
                      : "rgba(255,255,255,0.06)",
                  border: selectedOption === i ? "2px solid rgba(241,123,171,0.6)" : "2px solid rgba(255,255,255,0.08)",
                  borderRadius: "13px",
                  padding: "13px 16px",
                  color: "rgba(247,165,205,0.9)",
                  fontWeight: 500,
                  fontSize: "0.88rem",
                  cursor: answering || transitioning ? "not-allowed" : "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  opacity: answering && selectedOption !== i ? 0.4 : 1,
                  transform: selectedOption === i ? "scale(1.02)" : "scale(1)",
                  boxShadow: selectedOption === i ? "0 0 16px rgba(241,123,171,0.3)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: selectedOption === i ? "rgba(241,123,171,0.5)" : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {selectedOption === i ? "✓" : String.fromCharCode(65 + i)}
                </span>
                <span style={{ flex: 1 }}>{opt.label[lang]}</span>
              </button>
            ))}
          </div>

          {showBubble && (
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", color: "rgba(158,189,156,0.5)", letterSpacing: "0.06em" }}>
                {lang === "el" ? "Escape / Space / κλικ στη φούσκα για παράλειψη" : "Escape · Space · or tap bubble to skip"}
              </span>
            </div>
          )}
        </div>

        {/* Male avatar */}
        <div
          className="hidden md:flex"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            paddingLeft: "5%",
            minHeight: "clamp(380px, 72vh, 780px)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <Avatar gender="male" visible={showMale} talking={maleTalking} side="right" />
          {/* Comic arrow ← toward center, at face height */}
          {showBubble && showMale && (
            <div
              className="hidden md:block"
              style={{ position: "absolute", left: 0, bottom: "calc(0.81 * clamp(480px, 56vw, 720px))", zIndex: 20, pointerEvents: "none" }}
            >
              <svg width="74" height="26" viewBox="0 0 74 26" fill="none">
                <path d="M70,13 C50,3 24,3 8,13" stroke="#050d07" strokeWidth="7" strokeLinecap="round" />
                <path d="M12,5 L0,13 L12,21" stroke="#050d07" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M70,13 C50,3 24,3 8,13" stroke="rgba(255,255,255,0.82)" strokeWidth="3.5" strokeLinecap="round" />
                <path
                  d="M12,5 L0,13 L12,21"
                  stroke="rgba(255,255,255,0.88)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function QuizQuestionsPage() {
  return (
    <Suspense
      fallback={
        <div className="aroma-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100svh" }}>
          <div style={{ color: "rgba(158,189,156,0.8)", fontSize: "1.1rem", letterSpacing: "0.1em" }}>Loading...</div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
