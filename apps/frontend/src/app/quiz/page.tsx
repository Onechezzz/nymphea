'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '@aroma/shared-types';

export default function QuizPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language | null>(null);
  const [quizType, setQuizType] = useState<string | null>(null);

  useEffect(() => {
    // Sync data on first load
    syncData();
  }, []);

  const syncData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/snapshot`);
      const snapshot = await response.json();
      
      // Save to IndexedDB
      const { saveSnapshot } = await import('@/lib/db');
      await saveSnapshot(snapshot);
      
      console.log('Data synced successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  if (!language) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Оберіть мову / Choose language
          </h1>
          
          <div className="space-y-3">
            <button
              onClick={() => setLanguage(Language.UK)}
              className="btn-primary w-full text-lg"
            >
              🇺🇦 Українська
            </button>
            <button
              onClick={() => setLanguage(Language.RU)}
              className="btn-primary w-full text-lg"
            >
              🇷🇺 Русский
            </button>
            <button
              onClick={() => setLanguage(Language.EN)}
              className="btn-primary w-full text-lg"
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizType) {
    const texts = {
      uk: {
        title: 'Оберіть тип квізу',
        fast: 'Швидкий (10 питань)',
        medium: 'Середній (20 питань)',
        long: 'Повний (30 питань)',
        fastDesc: '~2 хвилини',
        mediumDesc: '~5 хвилин',
        longDesc: '~10 хвилин',
      },
      ru: {
        title: 'Выберите тип квиза',
        fast: 'Быстрый (10 вопросов)',
        medium: 'Средний (20 вопросов)',
        long: 'Полный (30 вопросов)',
        fastDesc: '~2 минуты',
        mediumDesc: '~5 минут',
        longDesc: '~10 минут',
      },
      en: {
        title: 'Choose quiz type',
        fast: 'Fast (10 questions)',
        medium: 'Medium (20 questions)',
        long: 'Long (30 questions)',
        fastDesc: '~2 minutes',
        mediumDesc: '~5 minutes',
        longDesc: '~10 minutes',
      },
    };

    const t = texts[language];

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {t.title}
          </h1>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push(`/quiz/questions?lang=${language}&type=fast`)}
              className="card hover:shadow-xl transition-shadow cursor-pointer text-center"
            >
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-bold text-lg mb-1">{t.fast}</h3>
              <p className="text-gray-600 text-sm">{t.fastDesc}</p>
            </button>

            <button
              onClick={() => router.push(`/quiz/questions?lang=${language}&type=medium`)}
              className="card hover:shadow-xl transition-shadow cursor-pointer text-center"
            >
              <div className="text-4xl mb-2">💫</div>
              <h3 className="font-bold text-lg mb-1">{t.medium}</h3>
              <p className="text-gray-600 text-sm">{t.mediumDesc}</p>
            </button>

            <button
              onClick={() => router.push(`/quiz/questions?lang=${language}&type=long`)}
              className="card hover:shadow-xl transition-shadow cursor-pointer text-center"
            >
              <div className="text-4xl mb-2">✨</div>
              <h3 className="font-bold text-lg mb-1">{t.long}</h3>
              <p className="text-gray-600 text-sm">{t.longDesc}</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
