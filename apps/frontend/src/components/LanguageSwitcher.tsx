'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Lang } from '@/lib/translations';

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'el', label: 'ΕΛ', flag: '🇬🇷' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {languages.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: lang === code
              ? 'rgba(241, 123, 171, 0.7)'
              : 'transparent',
            color: lang === code ? 'white' : 'rgba(255,255,255,0.5)',
            boxShadow: lang === code
              ? '0 2px 12px rgba(241,123,171,0.4)'
              : 'none',
          }}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
