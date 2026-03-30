'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lang } from '@/lib/translations';

interface AromaI18n {
  uk?: { name: string; shortDesc: string; style: string };
  ru?: { name: string; shortDesc: string; style: string };
  en:  { name: string; shortDesc: string; style: string };
  el?: { name: string; shortDesc: string; style: string };
}

interface MatchResult {
  aroma: {
    id: string;
    brand: string;
    gender: string;
    tags: string[];
    i18n: AromaI18n;
  };
  score: number;
  breakdown: { facetScore: number; vibeScore: number; tagScore: number };
}

interface Profile {
  id: string;
  name: { uk?: string; ru?: string; en: string; el?: string; mbti?: string };
  image?: string;
}

interface QuizResult {
  psychologicalProfile: Profile;
  matches: MatchResult[];
}

function getAromaName(i18n: AromaI18n, lang: Lang): string {
  return (lang === 'el' && i18n.el?.name) ? i18n.el.name : i18n.en?.name || '';
}

function getAromaDesc(i18n: AromaI18n, lang: Lang): string {
  return (lang === 'el' && i18n.el?.shortDesc) ? i18n.el.shortDesc : i18n.en?.shortDesc || '';
}

function getAromaStyle(i18n: AromaI18n, lang: Lang): string {
  return (lang === 'el' && i18n.el?.style) ? i18n.el.style : i18n.en?.style || '';
}

export default function ResultsPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('quiz_result');
    if (!data) { router.push('/'); return; }
    try { setResult(JSON.parse(data)); }
    catch { router.push('/'); }
  }, [router]);

  if (!result) {
    return (
      <div className="aroma-bg min-h-screen flex items-center justify-center">
        <p style={{ color: 'rgba(158,189,156,0.7)', letterSpacing: '0.1em' }}>
          {t('loading')}
        </p>
      </div>
    );
  }

  const genderIcon: Record<string, string> = { male: '♂', female: '♀', unisex: '⚥' };

  return (
    <div className="aroma-bg min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header style={{
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,5,20,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          background: 'linear-gradient(90deg, #f7a5cd, #77a394)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          AURA MYTHOS
        </div>
        <Link
          href="/"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '8px 16px',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            fontSize: '0.85rem',
          }}
        >
          ← {t('home')}
        </Link>
      </header>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✨</div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, #f7a5cd, #77a394)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            {t('yourResult')}
          </h1>
          <p style={{ color: 'rgba(158,189,156,0.7)', fontSize: '0.85rem', letterSpacing: '0.15em' }}>
            {avatarResultText(lang)}
          </p>
        </div>

        {/* Psychological Profile */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '24px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(55,77,32,0.4), rgba(119,163,148,0.15))',
          border: '1px solid rgba(241,123,171,0.3)',
        }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'rgba(158,189,156,0.65)',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}>
            {t('profileTitle')}
          </p>

          {/* Emoji icon */}
          <div style={{ fontSize: '4rem', marginBottom: '10px', lineHeight: 1 }}>
            {result.psychologicalProfile.image || '🎭'}
          </div>

          {/* MBTI badge */}
          {result.psychologicalProfile.name.mbti && (
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(241,123,171,0.35), rgba(119,163,148,0.25))',
              border: '1px solid rgba(241,123,171,0.5)',
              borderRadius: '8px',
              padding: '3px 12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: '#f7a5cd',
              marginBottom: '12px',
            }}>
              {result.psychologicalProfile.name.mbti}
            </div>
          )}

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#f7a5cd',
            letterSpacing: '0.04em',
            marginBottom: '4px',
          }}>
            {lang === 'el' && result.psychologicalProfile.name.el
              ? result.psychologicalProfile.name.el
              : result.psychologicalProfile.name.en}
          </h2>

          <div style={{
            marginTop: '14px',
            display: 'inline-flex',
            gap: '8px',
            background: 'rgba(241,123,171,0.1)',
            borderRadius: '12px',
            padding: '8px 16px',
            border: '1px solid rgba(241,123,171,0.2)',
          }}>
            <span style={{ color: 'rgba(158,189,156,0.7)', fontSize: '0.78rem' }}>
              {lang === 'el' ? '✦ Η ουσία σου αποκαλύφθηκε ✦' : '✦ Your essence has been revealed ✦'}
            </span>
          </div>
        </div>

        {/* Matches */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            color: 'rgba(158,189,156,0.65)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            {t('aromaTitle')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {result.matches.slice(0, 8).map((match, index) => {
              const scorePercent = Math.round(match.score * 100);
              const isTop = index === 0;

              return (
                <div
                  key={match.aroma.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '18px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: isTop
                      ? '1px solid rgba(241,123,171,0.5)'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: isTop
                      ? 'rgba(55,77,32,0.3)'
                      : 'rgba(255,255,255,0.04)',
                    boxShadow: isTop ? '0 0 24px rgba(241,123,171,0.2)' : 'none',
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: isTop
                      ? 'linear-gradient(135deg, #f17bab, #77a394)'
                      : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isTop ? '1.2rem' : '0.9rem',
                    fontWeight: 700,
                    color: isTop ? 'white' : 'rgba(255,255,255,0.4)',
                    flexShrink: 0,
                  }}>
                    {isTop ? '👑' : `#${index + 1}`}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(241,123,171,0.85)', fontWeight: 600, letterSpacing: '0.1em' }}>
                        {match.aroma.brand}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>
                        {genderIcon[match.aroma.gender]}
                      </span>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f7a5cd', marginBottom: '4px' }}>
                      {getAromaName(match.aroma.i18n, lang)}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>
                      {getAromaDesc(match.aroma.i18n, lang)}
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {match.aroma.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{
                          background: 'rgba(241,123,171,0.15)',
                          border: '1px solid rgba(241,123,171,0.2)',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.7rem',
                          color: 'rgba(247,165,205,0.85)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      background: scorePercent >= 75
                        ? 'linear-gradient(135deg, #f17bab, #77a394)'
                        : 'none',
                      WebkitBackgroundClip: scorePercent >= 75 ? 'text' : 'unset',
                      WebkitTextFillColor: scorePercent >= 75 ? 'transparent' : 'rgba(255,255,255,0.5)',
                      color: scorePercent >= 75 ? undefined : 'rgba(255,255,255,0.5)',
                    }}>
                      {scorePercent}%
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                      {t('match')}
                    </div>

                    {/* Mini score bar */}
                    <div style={{
                      width: '40px',
                      height: '3px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '9999px',
                      marginTop: '6px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${scorePercent}%`,
                        background: 'linear-gradient(90deg, #f17bab, #77a394)',
                        borderRadius: '9999px',
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #f17bab, #77a394)',
              borderRadius: '14px',
              color: 'white',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(241,123,171,0.4)',
              fontSize: '0.95rem',
            }}
          >
            {t('restart')}
          </Link>
          <Link
            href="/"
            style={{
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.95rem',
            }}
          >
            {t('home')}
          </Link>
        </div>
      </main>
    </div>
  );
}

function avatarResultText(lang: Lang): string {
  return lang === 'el'
    ? 'Τα αρώματά σου έχουν αποκαλυφθεί'
    : 'Your fragrance destiny has been revealed';
}
