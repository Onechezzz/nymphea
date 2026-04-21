"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { avatarComments } from "@/lib/avatarComments";

type Gender = "male" | "female" | "unisex";
type Difficulty = "easy" | "medium" | "hard";
type Step = "gender" | "difficulty" | "ready";

// Typewriter comic bubble with skip
// Central speech bubble
function SpeechBubble({ text, visible, onSkip }: { text: string; visible: boolean; onSkip?: () => void }) {
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
          cursor: onSkip ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {displayed}
        {!done && <span style={{ animation: "blink 0.7s step-end infinite", marginLeft: "1px" }}>|</span>}
        {done && onSkip && <div style={{ fontSize: "0.65rem", color: "rgba(119,163,148,0.7)", marginTop: "4px" }}>tap to skip →</div>}
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

export default function HomePage() {
  const router = useRouter();
  const { lang, t } = useLanguage();

  const [step, setStep] = useState<Step>("gender");
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showFemale, setShowFemale] = useState(true);
  const [showMale, setShowMale] = useState(true);
  const [femaleTalking, setFemaleTalking] = useState(false);
  const [maleTalking, setMaleTalking] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingAction = useRef<(() => void) | null>(null);

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

  // Keyboard skip
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === " ") && showBubble) {
        e.preventDefault();
        skipBubble();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showBubble, skipBubble]);

  // Sync data
  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/snapshot`);
        if (res.ok) {
          const snapshot = await res.json();
          const { saveSnapshot } = await import("@/lib/db");
          await saveSnapshot(snapshot);
        }
      } catch {}
    };
    sync();
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleText(avatarComments[lang].greeting);
      setShowBubble(true);
      setFemaleTalking(true);
      setMaleTalking(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowBubble(false);
        setFemaleTalking(false);
        setMaleTalking(false);
      }, 5000);
    }, 700);
    return () => clearTimeout(timer);
  }, [lang]);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    if (timerRef.current) clearTimeout(timerRef.current);

    setShowFemale(gender !== "male");
    setShowMale(gender !== "female");
    setFemaleTalking(gender !== "male");
    setMaleTalking(gender !== "female");

    const key = `q1_${gender}` as keyof typeof avatarComments.en;
    setBubbleText(avatarComments[lang][key] || "");
    setShowBubble(true);

    pendingAction.current = () => setStep("difficulty");
    timerRef.current = setTimeout(() => {
      setShowBubble(false);
      setFemaleTalking(false);
      setMaleTalking(false);
      pendingAction.current = null;
      setStep("difficulty");
    }, 5000);
  };

  const handleDifficultySelect = (d: Difficulty) => {
    setSelectedDifficulty(d);

    // Brief avatar reaction
    const comments: Record<Difficulty, Record<"en" | "el", string>> = {
      easy: {
        en: "Perfect for a quick discovery! 10 questions will reveal your essence.",
        el: "Τέλειο για γρήγορη ανακάλυψη! 10 ερωτήσεις θα αποκαλύψουν την ουσία σου.",
      },
      medium: {
        en: "A deeper journey! 20 questions for a more precise match.",
        el: "Ένα βαθύτερο ταξίδι! 20 ερωτήσεις για πιο ακριβή αντιστοιχία.",
      },
      hard: {
        en: "The full ritual! 30 questions for the most accurate fragrance match.",
        el: "Το πλήρες τελετουργικό! 30 ερωτήσεις για την πιο ακριβή αντιστοιχία.",
      },
    };

    if (timerRef.current) clearTimeout(timerRef.current);
    setBubbleText(comments[d][lang]);
    setShowBubble(true);
    setFemaleTalking(selectedGender !== "male");
    setMaleTalking(selectedGender !== "female");

    pendingAction.current = () => setStep("ready");
    timerRef.current = setTimeout(() => {
      setShowBubble(false);
      setFemaleTalking(false);
      setMaleTalking(false);
      pendingAction.current = null;
      setStep("ready");
    }, 4000);
  };

  const handleStart = () => {
    if (!selectedGender || !selectedDifficulty) return;
    router.push(`/quiz/questions?lang=${lang}&gender=${selectedGender}&difficulty=${selectedDifficulty}`);
  };

  const difficultyConfig = [
    {
      id: "easy" as Difficulty,
      label: lang === "el" ? "Απλό" : "Simple",
      desc: lang === "el" ? "10 ερωτήσεις" : "10 questions",
      icon: "⚡",
      note: lang === "el" ? "Βασική ακρίβεια" : "Basic accuracy",
      color: "#0ea5e9",
    },
    {
      id: "medium" as Difficulty,
      label: lang === "el" ? "Μεσαίο" : "Medium",
      desc: lang === "el" ? "20 ερωτήσεις" : "20 questions",
      icon: "💫",
      note: lang === "el" ? "Καλή ακρίβεια" : "Good accuracy",
      color: "#8b5cf6",
    },
    {
      id: "hard" as Difficulty,
      label: lang === "el" ? "Προχωρημένο" : "Advanced",
      desc: lang === "el" ? "30 ερωτήσεις" : "30 questions",
      icon: "🔮",
      note: lang === "el" ? "Μέγιστη ακρίβεια" : "Maximum accuracy",
      color: "#ec4899",
    },
  ];

  return (
    <div className="aroma-bg" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <header className="top-header">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nymphea-logo.png" alt="NYMPHEA" width={120} height={120} style={{ opacity: 0.9, display: "block" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {showBubble && (
            <button
              onClick={skipBubble}
              style={{
                background: "rgba(241,123,171,0.18)",
                border: "1px solid rgba(241,123,171,0.3)",
                color: "rgba(247,165,205,0.9)",
                borderRadius: "10px",
                padding: "7px 13px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Skip ⏭
            </button>
          )}
          <LanguageSwitcher />
          <Link
            href="/admin"
            title="Admin Panel"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* 3-column layout */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "66px",
          position: "relative",
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {/* ── Female Avatar Column ── */}
        <div
          className="hidden md:flex"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingRight: "5%",
            minHeight: "clamp(420px, 72vh, 800px)",
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

        {/* ── Center Panel ── */}
        <div
          style={{
            width: "100%",
            maxWidth: "clamp(340px, 44vw, 520px)",
            alignSelf: "stretch",
            padding: "clamp(76px, 9vh, 110px) 16px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            zIndex: 10,
          }}
        >
          {/* Logo + Tagline */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nymphea-logo.png" alt="NYMPHEA" width={240} height={240} style={{ opacity: 0.9 }} />
            <p
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(158,189,156,0.7)", textTransform: "uppercase", margin: 0 }}
            >
              {t("tagline")}
            </p>
          </div>

          {/* Central speech bubble */}
          {showBubble && <SpeechBubble text={bubbleText} visible={showBubble} onSkip={skipBubble} />}

          {/* Step indicator */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {(["gender", "difficulty", "ready"] as Step[]).map((s, i) => (
              <div
                key={s}
                style={{
                  width: step === s ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i <= (["gender", "difficulty", "ready"] as Step[]).indexOf(step) ? "rgba(241,123,171,0.8)" : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* === STEP 1: Gender === */}
          <div
            className="glass-panel"
            style={{
              width: "100%",
              borderRadius: "20px",
              padding: "18px",
              opacity: step === "gender" ? 1 : 0.4,
              transition: "all 0.5s ease",
            }}
          >
            <h2 style={{ textAlign: "center", fontWeight: 600, fontSize: "0.95rem", color: "rgba(247,165,205,0.9)", marginBottom: "14px" }}>
              {t("genderQuestion")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                {
                  id: "male" as Gender,
                  icon: "♂",
                  label: t("male"),
                  bg: "linear-gradient(135deg,#486a5e,#77a394)",
                  glow: "rgba(119,163,148,0.5)",
                },
                {
                  id: "female" as Gender,
                  icon: "♀",
                  label: t("female"),
                  bg: "linear-gradient(135deg,#c41168,#f17bab)",
                  glow: "rgba(241,123,171,0.5)",
                },
                {
                  id: "unisex" as Gender,
                  icon: "⚥",
                  label: t("unisex"),
                  bg: "linear-gradient(135deg,#374d20,#7eb049)",
                  glow: "rgba(158,189,156,0.5)",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => step === "gender" && handleGenderSelect(opt.id)}
                  style={{
                    background: opt.bg,
                    border: selectedGender === opt.id ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent",
                    borderRadius: "13px",
                    padding: "12px 16px",
                    color: "white",
                    cursor: step === "gender" ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    transition: "all 0.25s ease",
                    boxShadow: selectedGender === opt.id ? `0 0 20px ${opt.glow}` : "0 4px 10px rgba(0,0,0,0.2)",
                    transform: selectedGender === opt.id ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{opt.icon}</span>
                  <span>{opt.label}</span>
                  {selectedGender === opt.id && <span style={{ marginLeft: "auto" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* === STEP 2: Difficulty === */}
          <div
            className="glass-panel"
            style={{
              width: "100%",
              borderRadius: "20px",
              padding: "18px",
              opacity: step === "difficulty" || step === "ready" ? 1 : 0.25,
              transition: "all 0.5s ease",
              pointerEvents: step === "difficulty" ? "auto" : "none",
            }}
          >
            <h2 style={{ textAlign: "center", fontWeight: 600, fontSize: "0.95rem", color: "rgba(247,165,205,0.9)", marginBottom: "14px" }}>
              {lang === "el" ? "Επίλεξε βαθμό δυσκολίας" : "Choose difficulty level"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {difficultyConfig.map((d) => (
                <button
                  key={d.id}
                  onClick={() => step === "difficulty" && handleDifficultySelect(d.id)}
                  style={{
                    background:
                      selectedDifficulty === d.id ? `linear-gradient(135deg, ${d.color}33, ${d.color}22)` : "rgba(255,255,255,0.05)",
                    border: selectedDifficulty === d.id ? `2px solid ${d.color}80` : "2px solid rgba(255,255,255,0.08)",
                    borderRadius: "13px",
                    padding: "12px 16px",
                    color: "white",
                    cursor: step === "difficulty" ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.25s ease",
                    transform: selectedDifficulty === d.id ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{d.icon}</span>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{d.label}</span>
                    <span style={{ marginLeft: "8px", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{d.desc}</span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: `${d.color}cc`, fontWeight: 600, letterSpacing: "0.05em" }}>{d.note}</span>
                  {selectedDifficulty === d.id && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* === Start Button === */}
          <div
            style={{
              width: "100%",
              maxHeight: step === "ready" ? "80px" : "0",
              overflow: "hidden",
              opacity: step === "ready" ? 1 : 0,
              transition: "max-height 0.5s ease, opacity 0.4s ease",
            }}
          >
            <button
              onClick={handleStart}
              style={{
                width: "100%",
                padding: "16px",
                background: "linear-gradient(135deg,#f17bab,#77a394)",
                border: "none",
                borderRadius: "16px",
                color: "white",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(241,123,171,0.45)",
                transition: "all 0.2s ease",
              }}
            >
              {t("startQuiz")} →
            </button>
          </div>
        </div>

        {/* ── Male Avatar Column ── */}
        <div
          className="hidden md:flex"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            paddingLeft: "5%",
            minHeight: "clamp(420px, 72vh, 800px)",
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
