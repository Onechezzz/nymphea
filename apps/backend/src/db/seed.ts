import pool from './index';
import bcrypt from 'bcryptjs';
import { Gender, QuizType } from '@aroma/shared-types';

const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // 1. Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      `INSERT INTO users (email, password_hash) 
       VALUES ($1, $2) 
       ON CONFLICT (email) DO NOTHING`,
      ['admin@aroma.com', hashedPassword]
    );
    console.log('✓ Admin user created (admin@aroma.com / admin123)');

    // 2. Create aromas
    const aromas = [
      {
        brand: 'Chanel',
        gender: Gender.FEMALE,
        intensity: { sillage: 0.7, longevity: 0.8 },
        facets: {
          freshness: 0.3,
          sweetness: 0.6,
          warmth: 0.7,
          woodiness: 0.4,
          florality: 0.8,
          spiciness: 0.2,
          clean_musk: 0.5,
          powdery: 0.7,
          green: 0.2,
          citrus: 0.3,
          ambery: 0.6,
        },
        vibe: {
          day_night: 0.6,
          formal_casual: 0.3,
          introvert_extrovert: 0.5,
          safe_provocative: 0.4,
        },
        tags: ['elegant', 'classic', 'floral'],
        i18n: {
          uk: {
            name: 'Chanel No. 5',
            shortDesc: 'Культовий жіночий аромат',
            style: 'Класична елегантність',
          },
          ru: {
            name: 'Chanel No. 5',
            shortDesc: 'Культовый женский аромат',
            style: 'Классическая элегантность',
          },
          en: {
            name: 'Chanel No. 5',
            shortDesc: 'Iconic feminine fragrance',
            style: 'Classic elegance',
          },
          el: {
            name: 'Chanel No. 5',
            shortDesc: 'Εμβληματικό γυναικείο άρωμα',
            style: 'Κλασική κομψότητα',
          },
        },
      },
      {
        brand: 'Dior',
        gender: Gender.MALE,
        intensity: { sillage: 0.8, longevity: 0.7 },
        facets: {
          freshness: 0.7,
          sweetness: 0.3,
          warmth: 0.5,
          woodiness: 0.6,
          florality: 0.2,
          spiciness: 0.5,
          clean_musk: 0.6,
          powdery: 0.2,
          green: 0.4,
          citrus: 0.8,
          ambery: 0.4,
        },
        vibe: {
          day_night: 0.4,
          formal_casual: 0.5,
          introvert_extrovert: 0.6,
          safe_provocative: 0.5,
        },
        tags: ['fresh', 'sporty', 'citrus'],
        i18n: {
          uk: {
            name: 'Dior Sauvage',
            shortDesc: 'Свіжий чоловічий аромат',
            style: 'Сучасна мужність',
          },
          ru: {
            name: 'Dior Sauvage',
            shortDesc: 'Свежий мужской аромат',
            style: 'Современная мужественность',
          },
          en: {
            name: 'Dior Sauvage',
            shortDesc: 'Fresh masculine fragrance',
            style: 'Modern masculinity',
          },
          el: {
            name: 'Dior Sauvage',
            shortDesc: 'Φρέσκο ανδρικό άρωμα',
            style: 'Σύγχρονη ανδρεία',
          },
        },
      },
      {
        brand: 'Tom Ford',
        gender: Gender.UNISEX,
        intensity: { sillage: 0.9, longevity: 0.9 },
        facets: {
          freshness: 0.2,
          sweetness: 0.5,
          warmth: 0.9,
          woodiness: 0.8,
          florality: 0.3,
          spiciness: 0.7,
          clean_musk: 0.4,
          powdery: 0.3,
          green: 0.1,
          citrus: 0.2,
          ambery: 0.9,
        },
        vibe: {
          day_night: 0.8,
          formal_casual: 0.3,
          introvert_extrovert: 0.4,
          safe_provocative: 0.8,
        },
        tags: ['luxury', 'warm', 'oriental'],
        i18n: {
          uk: {
            name: 'Tom Ford Tobacco Vanille',
            shortDesc: 'Розкішний унісекс аромат',
            style: 'Провокативна розкіш',
          },
          ru: {
            name: 'Tom Ford Tobacco Vanille',
            shortDesc: 'Роскошный унисекс аромат',
            style: 'Провокационная роскошь',
          },
          en: {
            name: 'Tom Ford Tobacco Vanille',
            shortDesc: 'Luxurious unisex fragrance',
            style: 'Provocative luxury',
          },
          el: {
            name: 'Tom Ford Tobacco Vanille',
            shortDesc: 'Πολυτελές unisex άρωμα',
            style: 'Προκλητική πολυτέλεια',
          },
        },
      },
      {
        brand: 'Yves Saint Laurent',
        gender: Gender.FEMALE,
        intensity: { sillage: 0.8, longevity: 0.8 },
        facets: {
          freshness: 0.4,
          sweetness: 0.8,
          warmth: 0.6,
          woodiness: 0.3,
          florality: 0.7,
          spiciness: 0.4,
          clean_musk: 0.5,
          powdery: 0.6,
          green: 0.2,
          citrus: 0.5,
          ambery: 0.5,
        },
        vibe: {
          day_night: 0.7,
          formal_casual: 0.5,
          introvert_extrovert: 0.7,
          safe_provocative: 0.6,
        },
        tags: ['sweet', 'romantic', 'fruity'],
        i18n: {
          uk: {
            name: 'YSL Black Opium',
            shortDesc: 'Солодкий вечірній аромат',
            style: 'Спокуслива романтика',
          },
          ru: {
            name: 'YSL Black Opium',
            shortDesc: 'Сладкий вечерний аромат',
            style: 'Соблазнительная романтика',
          },
          en: {
            name: 'YSL Black Opium',
            shortDesc: 'Sweet evening fragrance',
            style: 'Seductive romance',
          },
          el: {
            name: 'YSL Black Opium',
            shortDesc: 'Γλυκό βραδινό άρωμα',
            style: 'Σαγηνευτικό ρομάντζο',
          },
        },
      },
      {
        brand: 'Prada',
        gender: Gender.MALE,
        intensity: { sillage: 0.6, longevity: 0.7 },
        facets: {
          freshness: 0.8,
          sweetness: 0.2,
          warmth: 0.4,
          woodiness: 0.5,
          florality: 0.3,
          spiciness: 0.4,
          clean_musk: 0.7,
          powdery: 0.3,
          green: 0.6,
          citrus: 0.7,
          ambery: 0.3,
        },
        vibe: {
          day_night: 0.3,
          formal_casual: 0.4,
          introvert_extrovert: 0.4,
          safe_provocative: 0.3,
        },
        tags: ['clean', 'aquatic', 'fresh'],
        i18n: {
          uk: {
            name: 'Prada Luna Rossa',
            shortDesc: 'Чистий денний аромат',
            style: 'Елегантна свіжість',
          },
          ru: {
            name: 'Prada Luna Rossa',
            shortDesc: 'Чистый дневной аромат',
            style: 'Элегантная свежесть',
          },
          en: {
            name: 'Prada Luna Rossa',
            shortDesc: 'Clean daytime fragrance',
            style: 'Elegant freshness',
          },
          el: {
            name: 'Prada Luna Rossa',
            shortDesc: 'Καθαρό ημερήσιο άρωμα',
            style: 'Κομψή φρεσκάδα',
          },
        },
      },
    ];

    for (const aroma of aromas) {
      await pool.query(
        `INSERT INTO aromas (brand, gender, intensity, facets, vibe, tags, i18n)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          aroma.brand,
          aroma.gender,
          JSON.stringify(aroma.intensity),
          JSON.stringify(aroma.facets),
          JSON.stringify(aroma.vibe),
          JSON.stringify(aroma.tags),
          JSON.stringify(aroma.i18n),
        ]
      );
    }
    console.log(`✓ Created ${aromas.length} aromas`);

    // 3. Create quiz (fast type with 10 questions)
    const quiz = {
      type: QuizType.FAST,
      questions: [
        {
          id: 'q1',
          i18n: {
            uk: 'Який тип парфуму ви шукаєте?',
            ru: 'Какой тип парфюма вы ищете?',
            en: 'What type of perfume are you looking for?',
          },
          options: [
            {
              id: 'q1_male',
              i18n: { uk: 'Чоловічий', ru: 'Мужской', en: 'Male' },
              answer: { facets: {}, vibe: {}, tags: [] },
            },
            {
              id: 'q1_female',
              i18n: { uk: 'Жіночий', ru: 'Женский', en: 'Female' },
              answer: { facets: {}, vibe: {}, tags: [] },
            },
            {
              id: 'q1_unisex',
              i18n: { uk: 'Унісекс', ru: 'Унисекс', en: 'Unisex' },
              answer: { facets: {}, vibe: {}, tags: [] },
            },
          ],
        },
        {
          id: 'q2',
          i18n: {
            uk: 'Коли ви плануєте носити цей парфум?',
            ru: 'Когда вы планируете носить этот парфюм?',
            en: 'When do you plan to wear this perfume?',
          },
          options: [
            {
              id: 'q2_day',
              i18n: { uk: 'Вдень', ru: 'Днем', en: 'Daytime' },
              answer: { vibe: { day_night: 0 } },
            },
            {
              id: 'q2_evening',
              i18n: { uk: 'Ввечері', ru: 'Вечером', en: 'Evening' },
              answer: { vibe: { day_night: 1 } },
            },
            {
              id: 'q2_both',
              i18n: { uk: 'Будь-коли', ru: 'В любое время', en: 'Anytime' },
              answer: { vibe: { day_night: 0.5 } },
            },
          ],
        },
        {
          id: 'q3',
          i18n: {
            uk: 'Яку свіжість ви віддаєте перевагу?',
            ru: 'Какую свежесть вы предпочитаете?',
            en: 'What level of freshness do you prefer?',
          },
          options: [
            {
              id: 'q3_very_fresh',
              i18n: { uk: 'Дуже свіжий', ru: 'Очень свежий', en: 'Very fresh' },
              answer: { facets: { freshness: 1, citrus: 0.8 }, tags: ['fresh'] },
            },
            {
              id: 'q3_moderate',
              i18n: { uk: 'Помірний', ru: 'Умеренный', en: 'Moderate' },
              answer: { facets: { freshness: 0.5 } },
            },
            {
              id: 'q3_warm',
              i18n: { uk: 'Теплий', ru: 'Теплый', en: 'Warm' },
              answer: { facets: { freshness: 0.2, warmth: 0.8 }, tags: ['warm'] },
            },
          ],
        },
        {
          id: 'q4',
          i18n: {
            uk: 'Ви любите солодкі аромати?',
            ru: 'Вы любите сладкие ароматы?',
            en: 'Do you like sweet fragrances?',
          },
          options: [
            {
              id: 'q4_yes',
              i18n: { uk: 'Так, дуже', ru: 'Да, очень', en: 'Yes, very much' },
              answer: { facets: { sweetness: 0.9 }, tags: ['sweet'] },
            },
            {
              id: 'q4_little',
              i18n: { uk: 'Трохи', ru: 'Немного', en: 'A little' },
              answer: { facets: { sweetness: 0.5 } },
            },
            {
              id: 'q4_no',
              i18n: { uk: 'Ні', ru: 'Нет', en: 'No' },
              answer: { facets: { sweetness: 0.1 } },
            },
          ],
        },
        {
          id: 'q5',
          i18n: {
            uk: 'Квіткові ноти для вас?',
            ru: 'Цветочные ноты для вас?',
            en: 'Floral notes for you?',
          },
          options: [
            {
              id: 'q5_love',
              i18n: { uk: 'Обожнюю', ru: 'Обожаю', en: 'Love them' },
              answer: { facets: { florality: 0.9 }, tags: ['floral'] },
            },
            {
              id: 'q5_neutral',
              i18n: { uk: 'Нейтрально', ru: 'Нейтрально', en: 'Neutral' },
              answer: { facets: { florality: 0.5 } },
            },
            {
              id: 'q5_avoid',
              i18n: { uk: 'Уникаю', ru: 'Избегаю', en: 'Avoid' },
              answer: { facets: { florality: 0.1 } },
            },
          ],
        },
        {
          id: 'q6',
          i18n: {
            uk: 'Яку атмосферу ви хочете створити?',
            ru: 'Какую атмосферу вы хотите создать?',
            en: 'What atmosphere do you want to create?',
          },
          options: [
            {
              id: 'q6_formal',
              i18n: { uk: 'Формальну', ru: 'Формальную', en: 'Formal' },
              answer: { vibe: { formal_casual: 0 }, tags: ['elegant'] },
            },
            {
              id: 'q6_casual',
              i18n: { uk: 'Казуальну', ru: 'Казуальную', en: 'Casual' },
              answer: { vibe: { formal_casual: 1 }, tags: ['casual'] },
            },
            {
              id: 'q6_versatile',
              i18n: { uk: 'Універсальну', ru: 'Универсальную', en: 'Versatile' },
              answer: { vibe: { formal_casual: 0.5 } },
            },
          ],
        },
        {
          id: 'q7',
          i18n: {
            uk: 'Деревні ноти?',
            ru: 'Древесные ноты?',
            en: 'Woody notes?',
          },
          options: [
            {
              id: 'q7_yes',
              i18n: { uk: 'Так, люблю', ru: 'Да, люблю', en: 'Yes, love them' },
              answer: { facets: { woodiness: 0.9 }, tags: ['woody'] },
            },
            {
              id: 'q7_some',
              i18n: { uk: 'Трохи', ru: 'Немного', en: 'Some' },
              answer: { facets: { woodiness: 0.5 } },
            },
            {
              id: 'q7_no',
              i18n: { uk: 'Ні', ru: 'Нет', en: 'No' },
              answer: { facets: { woodiness: 0.1 } },
            },
          ],
        },
        {
          id: 'q8',
          i18n: {
            uk: 'Ви інтроверт чи екстраверт?',
            ru: 'Вы интроверт или экстраверт?',
            en: 'Are you introvert or extrovert?',
          },
          options: [
            {
              id: 'q8_introvert',
              i18n: { uk: 'Інтроверт', ru: 'Интроверт', en: 'Introvert' },
              answer: { vibe: { introvert_extrovert: 0 } },
            },
            {
              id: 'q8_extrovert',
              i18n: { uk: 'Екстраверт', ru: 'Экстраверт', en: 'Extrovert' },
              answer: { vibe: { introvert_extrovert: 1 } },
            },
            {
              id: 'q8_ambivert',
              i18n: { uk: 'Амбіверт', ru: 'Амбиверт', en: 'Ambivert' },
              answer: { vibe: { introvert_extrovert: 0.5 } },
            },
          ],
        },
        {
          id: 'q9',
          i18n: {
            uk: 'Пряні нотки?',
            ru: 'Пряные нотки?',
            en: 'Spicy notes?',
          },
          options: [
            {
              id: 'q9_yes',
              i18n: { uk: 'Так', ru: 'Да', en: 'Yes' },
              answer: { facets: { spiciness: 0.9 }, tags: ['spicy'] },
            },
            {
              id: 'q9_little',
              i18n: { uk: 'Трохи', ru: 'Немного', en: 'A little' },
              answer: { facets: { spiciness: 0.5 } },
            },
            {
              id: 'q9_no',
              i18n: { uk: 'Ні', ru: 'Нет', en: 'No' },
              answer: { facets: { spiciness: 0.1 } },
            },
          ],
        },
        {
          id: 'q10',
          i18n: {
            uk: 'Ви хочете бути в зоні комфорту чи виділятися?',
            ru: 'Вы хотите быть в зоне комфорта или выделяться?',
            en: 'Do you want to stay safe or be provocative?',
          },
          options: [
            {
              id: 'q10_safe',
              i18n: { uk: 'Безпечно', ru: 'Безопасно', en: 'Safe' },
              answer: { vibe: { safe_provocative: 0 }, tags: ['classic'] },
            },
            {
              id: 'q10_balanced',
              i18n: { uk: 'Збалансовано', ru: 'Сбалансированно', en: 'Balanced' },
              answer: { vibe: { safe_provocative: 0.5 } },
            },
            {
              id: 'q10_provocative',
              i18n: { uk: 'Провокаційно', ru: 'Провокационно', en: 'Provocative' },
              answer: { vibe: { safe_provocative: 1 }, tags: ['bold'] },
            },
          ],
        },
      ],
    };

    await pool.query(
      `INSERT INTO quizzes (type, questions) VALUES ($1, $2)`,
      [quiz.type, JSON.stringify(quiz.questions)]
    );
    console.log('✓ Created quiz (fast)');

    // 4. Create 16 psychological profiles (MBTI archetypes)
    // Vibe mapping to MBTI axes:
    //   introvert_extrovert  → I (0.0-0.35) / E (0.65-1.0)
    //   safe_provocative     → S Sensing (0.0-0.35) / N Intuition (0.55-1.0)
    //   formal_casual        → T Thinking (0.0-0.35) / F Feeling (0.60-1.0)
    //   day_night            → J Judging (0.0-0.35) / P Perceiving (0.55-1.0)
    const profiles = [
      // ── INTJ — The Silent Architect ─────────────────────────────────────────
      {
        name: { en: 'The Silent Architect', el: 'Ο Αθόρυβος Αρχιτέκτονας', ru: 'Молчаливый Архитектор', uk: 'Мовчазний Архітектор' },
        image: '🏰',
        mbti: 'INTJ',
        target: {
          facets: { freshness: 0.35, sweetness: 0.10, warmth: 0.50, woodiness: 0.80, florality: 0.15, spiciness: 0.40, clean_musk: 0.70, powdery: 0.20, green: 0.35, citrus: 0.45, ambery: 0.55 },
          vibe:   { introvert_extrovert: 0.15, safe_provocative: 0.70, formal_casual: 0.15, day_night: 0.25 },
        },
      },
      // ── INTP — The Alchemist ─────────────────────────────────────────────────
      {
        name: { en: 'The Alchemist', el: 'Ο Αλχημιστής', ru: 'Алхимик', uk: 'Алхімік' },
        image: '⚗️',
        mbti: 'INTP',
        target: {
          facets: { freshness: 0.50, sweetness: 0.10, warmth: 0.35, woodiness: 0.65, florality: 0.15, spiciness: 0.35, clean_musk: 0.60, powdery: 0.15, green: 0.60, citrus: 0.70, ambery: 0.30 },
          vibe:   { introvert_extrovert: 0.10, safe_provocative: 0.75, formal_casual: 0.20, day_night: 0.65 },
        },
      },
      // ── ENTJ — The Sovereign ─────────────────────────────────────────────────
      {
        name: { en: 'The Sovereign', el: 'Ο Κυρίαρχος', ru: 'Властелин', uk: 'Владика' },
        image: '👑',
        mbti: 'ENTJ',
        target: {
          facets: { freshness: 0.40, sweetness: 0.10, warmth: 0.60, woodiness: 0.90, florality: 0.10, spiciness: 0.70, clean_musk: 0.55, powdery: 0.10, green: 0.25, citrus: 0.50, ambery: 0.65 },
          vibe:   { introvert_extrovert: 0.85, safe_provocative: 0.70, formal_casual: 0.15, day_night: 0.20 },
        },
      },
      // ── ENTP — The Provocateur ───────────────────────────────────────────────
      {
        name: { en: 'The Provocateur', el: 'Ο Προκλητικός', ru: 'Провокатор', uk: 'Провокатор' },
        image: '⚡',
        mbti: 'ENTP',
        target: {
          facets: { freshness: 0.55, sweetness: 0.20, warmth: 0.45, woodiness: 0.50, florality: 0.20, spiciness: 0.65, clean_musk: 0.45, powdery: 0.15, green: 0.55, citrus: 0.75, ambery: 0.40 },
          vibe:   { introvert_extrovert: 0.85, safe_provocative: 0.85, formal_casual: 0.40, day_night: 0.70 },
        },
      },
      // ── INFJ — The Mystic Oracle ─────────────────────────────────────────────
      {
        name: { en: 'The Mystic Oracle', el: 'Το Μυστικό Μαντείο', ru: 'Мистический Оракул', uk: 'Містичний Оракул' },
        image: '🔮',
        mbti: 'INFJ',
        target: {
          facets: { freshness: 0.35, sweetness: 0.40, warmth: 0.55, woodiness: 0.45, florality: 0.70, spiciness: 0.30, clean_musk: 0.65, powdery: 0.45, green: 0.35, citrus: 0.30, ambery: 0.60 },
          vibe:   { introvert_extrovert: 0.20, safe_provocative: 0.70, formal_casual: 0.65, day_night: 0.30 },
        },
      },
      // ── INFP — The Ethereal Dreamer ──────────────────────────────────────────
      {
        name: { en: 'The Ethereal Dreamer', el: 'Ο Αιθέριος Ονειροπόλος', ru: 'Эфемерный Мечтатель', uk: 'Ефемерний Мрійник' },
        image: '🌙',
        mbti: 'INFP',
        target: {
          facets: { freshness: 0.50, sweetness: 0.35, warmth: 0.40, woodiness: 0.35, florality: 0.85, spiciness: 0.15, clean_musk: 0.55, powdery: 0.40, green: 0.65, citrus: 0.40, ambery: 0.35 },
          vibe:   { introvert_extrovert: 0.15, safe_provocative: 0.75, formal_casual: 0.80, day_night: 0.65 },
        },
      },
      // ── ENFJ — The Radiant Muse ──────────────────────────────────────────────
      {
        name: { en: 'The Radiant Muse', el: 'Η Λαμπερή Μούσα', ru: 'Лучезарная Муза', uk: 'Сяюча Муза' },
        image: '🌟',
        mbti: 'ENFJ',
        target: {
          facets: { freshness: 0.45, sweetness: 0.45, warmth: 0.60, woodiness: 0.30, florality: 0.75, spiciness: 0.25, clean_musk: 0.65, powdery: 0.50, green: 0.35, citrus: 0.45, ambery: 0.50 },
          vibe:   { introvert_extrovert: 0.80, safe_provocative: 0.60, formal_casual: 0.75, day_night: 0.30 },
        },
      },
      // ── ENFP — The Luminous Spirit ───────────────────────────────────────────
      {
        name: { en: 'The Luminous Spirit', el: 'Το Φωτεινό Πνεύμα', ru: 'Светлый Дух', uk: 'Світлий Дух' },
        image: '🦋',
        mbti: 'ENFP',
        target: {
          facets: { freshness: 0.60, sweetness: 0.55, warmth: 0.45, woodiness: 0.25, florality: 0.65, spiciness: 0.20, clean_musk: 0.55, powdery: 0.35, green: 0.45, citrus: 0.65, ambery: 0.35 },
          vibe:   { introvert_extrovert: 0.90, safe_provocative: 0.75, formal_casual: 0.80, day_night: 0.65 },
        },
      },
      // ── ISTJ — The Timeless Classic ──────────────────────────────────────────
      {
        name: { en: 'The Timeless Classic', el: 'Το Διαχρονικό Κλασικό', ru: 'Вечная Классика', uk: 'Вічна Класика' },
        image: '🏛️',
        mbti: 'ISTJ',
        target: {
          facets: { freshness: 0.65, sweetness: 0.15, warmth: 0.40, woodiness: 0.55, florality: 0.25, spiciness: 0.25, clean_musk: 0.85, powdery: 0.30, green: 0.40, citrus: 0.60, ambery: 0.30 },
          vibe:   { introvert_extrovert: 0.20, safe_provocative: 0.15, formal_casual: 0.15, day_night: 0.15 },
        },
      },
      // ── ISFJ — The Tender Guardian ───────────────────────────────────────────
      {
        name: { en: 'The Tender Guardian', el: 'Ο Τρυφερός Φύλακας', ru: 'Нежный Хранитель', uk: 'Ніжний Охоронець' },
        image: '🌿',
        mbti: 'ISFJ',
        target: {
          facets: { freshness: 0.50, sweetness: 0.40, warmth: 0.55, woodiness: 0.35, florality: 0.65, spiciness: 0.15, clean_musk: 0.75, powdery: 0.60, green: 0.40, citrus: 0.45, ambery: 0.40 },
          vibe:   { introvert_extrovert: 0.20, safe_provocative: 0.15, formal_casual: 0.65, day_night: 0.20 },
        },
      },
      // ── ESTJ — The Noble Commander ───────────────────────────────────────────
      {
        name: { en: 'The Noble Commander', el: 'Ο Ευγενής Διοικητής', ru: 'Благородный Командир', uk: 'Благородний Командир' },
        image: '⚔️',
        mbti: 'ESTJ',
        target: {
          facets: { freshness: 0.55, sweetness: 0.15, warmth: 0.45, woodiness: 0.75, florality: 0.15, spiciness: 0.45, clean_musk: 0.75, powdery: 0.20, green: 0.35, citrus: 0.60, ambery: 0.40 },
          vibe:   { introvert_extrovert: 0.75, safe_provocative: 0.15, formal_casual: 0.15, day_night: 0.15 },
        },
      },
      // ── ESFJ — The Golden Heart ──────────────────────────────────────────────
      {
        name: { en: 'The Golden Heart', el: 'Η Χρυσή Καρδιά', ru: 'Золотое Сердце', uk: 'Золоте Серце' },
        image: '🌸',
        mbti: 'ESFJ',
        target: {
          facets: { freshness: 0.45, sweetness: 0.55, warmth: 0.60, woodiness: 0.25, florality: 0.75, spiciness: 0.15, clean_musk: 0.65, powdery: 0.50, green: 0.30, citrus: 0.50, ambery: 0.45 },
          vibe:   { introvert_extrovert: 0.75, safe_provocative: 0.20, formal_casual: 0.70, day_night: 0.20 },
        },
      },
      // ── ISTP — The Shadow Artisan ────────────────────────────────────────────
      {
        name: { en: 'The Shadow Artisan', el: 'Ο Τεχνίτης της Σκιάς', ru: 'Теневой Мастер', uk: 'Тіньовий Майстер' },
        image: '🗡️',
        mbti: 'ISTP',
        target: {
          facets: { freshness: 0.55, sweetness: 0.10, warmth: 0.40, woodiness: 0.75, florality: 0.10, spiciness: 0.45, clean_musk: 0.60, powdery: 0.10, green: 0.65, citrus: 0.65, ambery: 0.35 },
          vibe:   { introvert_extrovert: 0.15, safe_provocative: 0.20, formal_casual: 0.30, day_night: 0.65 },
        },
      },
      // ── ISFP — The Wild Wanderer ─────────────────────────────────────────────
      {
        name: { en: 'The Wild Wanderer', el: 'Ο Άγριος Περιπλανητής', ru: 'Дикий Странник', uk: 'Дикий Мандрівник' },
        image: '🌊',
        mbti: 'ISFP',
        target: {
          facets: { freshness: 0.65, sweetness: 0.25, warmth: 0.40, woodiness: 0.40, florality: 0.55, spiciness: 0.20, clean_musk: 0.50, powdery: 0.20, green: 0.75, citrus: 0.55, ambery: 0.30 },
          vibe:   { introvert_extrovert: 0.25, safe_provocative: 0.30, formal_casual: 0.80, day_night: 0.65 },
        },
      },
      // ── ESTP — The Electric Pioneer ──────────────────────────────────────────
      {
        name: { en: 'The Electric Pioneer', el: 'Ο Ηλεκτρικός Πρωτοπόρος', ru: 'Электрический Первопроходец', uk: 'Електричний Першопрохідець' },
        image: '🔥',
        mbti: 'ESTP',
        target: {
          facets: { freshness: 0.65, sweetness: 0.20, warmth: 0.50, woodiness: 0.50, florality: 0.15, spiciness: 0.65, clean_musk: 0.45, powdery: 0.10, green: 0.40, citrus: 0.75, ambery: 0.45 },
          vibe:   { introvert_extrovert: 0.85, safe_provocative: 0.30, formal_casual: 0.35, day_night: 0.70 },
        },
      },
      // ── ESFP — The Vivid Enchantress ─────────────────────────────────────────
      {
        name: { en: 'The Vivid Enchantress', el: 'Η Ζωηρή Μάγισσα', ru: 'Яркая Чаровница', uk: 'Яскрава Чаклунка' },
        image: '💫',
        mbti: 'ESFP',
        target: {
          facets: { freshness: 0.55, sweetness: 0.75, warmth: 0.55, woodiness: 0.20, florality: 0.65, spiciness: 0.20, clean_musk: 0.55, powdery: 0.40, green: 0.30, citrus: 0.60, ambery: 0.45 },
          vibe:   { introvert_extrovert: 0.90, safe_provocative: 0.35, formal_casual: 0.90, day_night: 0.65 },
        },
      },
    ];

    for (const profile of profiles) {
      const nameWithMbti = { ...profile.name, mbti: (profile as any).mbti };
      await pool.query(
        `INSERT INTO profiles (name, image, target) VALUES ($1, $2, $3)`,
        [
          JSON.stringify(nameWithMbti),
          profile.image,
          JSON.stringify(profile.target),
        ]
      );
    }
    console.log(`✓ Created ${profiles.length} psychological profiles (16 MBTI archetypes)`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nTest credentials:');
    console.log('  Email: admin@aroma.com');
    console.log('  Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}
