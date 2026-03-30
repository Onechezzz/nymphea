# Aroma - Perfume Selection App

## Огляд проєкту

Повнофункціональний веб-застосунок для персонального підбору парфуму на основі психологічного квізу. Система працює в offline-first режимі після першого завантаження даних.

## ✨ Основні можливості

### Клієнтська частина
- 🌍 Мультимовність (українська, російська, англійська)
- 📋 Інтерактивний квіз (швидкий/середній/повний)
- 🎯 Персональний підбір парфуму на базі алгоритму
- 🎭 Визначення психологічного портрету
- 📱 PWA з offline підтримкою
- 💾 IndexedDB для локального зберігання

### Адмін-панель
- 🔐 JWT авторизація
- ✏️ CRUD операції для ароматів
- 🔍 Пошук та фільтрація
- 📥 Імпорт/експорт JSON
- 📊 Управління параметрами ароматів (facets, vibe, intensity)

### Backend API
- 🚀 Express.js REST API
- 🗄️ PostgreSQL з JSONB
- 🔒 JWT аутентифікація
- ✅ Zod валідація
- 📡 Публічні та захищені endpoints

## 🏗️ Архітектура

```
aroma/
├── apps/
│   ├── backend/           # Node.js + Express + PostgreSQL
│   │   ├── src/
│   │   │   ├── db/       # Database, migrations, seeds
│   │   │   ├── routes/   # API routes
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   └── package.json
│   └── frontend/          # Next.js 14 App Router
│       ├── src/
│       │   ├── app/      # Pages (admin, quiz, results)
│       │   └── lib/      # API client, IndexedDB
│       ├── public/       # Static files, PWA manifest
│       └── package.json
├── packages/
│   ├── shared-types/     # TypeScript типи (Zod schemas)
│   └── matching-engine/  # Алгоритм підбору парфуму
└── package.json          # Monorepo root
```

## 🧮 Алгоритм підбору

Система використовує багатовимірний алгоритм схожості:

```
total_score = 0.65 × facetScore + 0.25 × vibeScore + 0.10 × tagScore
```

### Параметри

**Facets (11 параметрів 0-1):**
- freshness, sweetness, warmth, woodiness, florality
- spiciness, clean_musk, powdery, green, citrus, ambery

**Vibe (4 параметри 0-1):**
- day_night (0=день, 1=ніч)
- formal_casual (0=формально, 1=казуально)
- introvert_extrovert (0=інтроверт, 1=екстраверт)
- safe_provocative (0=безпечно, 1=провокаційно)

**Intensity:**
- sillage (стійкість шлейфу)
- longevity (тривалість)

**Гендерний фільтр:**
- male → male + unisex
- female → female + unisex
- unisex → тільки unisex

## 🚀 Швидкий старт

### Попередні вимоги

- Node.js 18+
- PostgreSQL 14+
- npm або yarn

### Встановлення

1. Клонуйте репозиторій:
```bash
git clone <repo-url>
cd aroma
```

2. Встановіть залежності:
```bash
npm install
```

3. Налаштуйте базу даних:
```bash
# Створіть PostgreSQL базу
createdb aroma

# Налаштуйте .env файл
cp apps/backend/.env.example apps/backend/.env
# Відредагуйте DATABASE_URL та JWT_SECRET
```

4. Запустіть міграції та seed:
```bash
npm run db:migrate
npm run db:seed
```

5. Налаштуйте frontend:
```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

6. Запустіть проєкт:
```bash
npm run dev
```

### Доступ

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Тестовий акаунт**: admin@aroma.com / admin123

## 📚 Документація

- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🧪 Тестові дані

Seed включає:
- 5 ароматів (Chanel, Dior, Tom Ford, YSL, Prada)
- 1 квіз (швидкий, 10 питань)
- 3 психологічні портрети
- 1 адмін-користувач

## 🔧 Технології

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- IndexedDB (idb)
- PWA (Service Worker)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- Zod

### Shared
- TypeScript
- Zod schemas
- Custom matching engine

## 📱 Offline-First

Після першого завантаження:
1. Snapshot (аромати + квізи + портрети) зберігається в IndexedDB
2. Service Worker кешує UI
3. Квіз працює повністю офлайн
4. Результати обчислюються локально

Адмін-панель працює тільки онлайн.

## 🎨 UI/UX

- Мінімалістичний дизайн
- Tablet-first responsive layout
- Інтуїтивна навігація
- Прогрес-бар у квізі
- Візуалізація результатів з процентами схожості

## 🔐 Безпека

- JWT токени з 7-денним терміном дії
- Bcrypt для хешування паролів
- CORS налаштований
- Валідація всіх inputs (Zod)
- SQL ін'єкції захищені (параметризовані запити)

## 🌟 Особливості реалізації

### Масштабованість
- Monorepo структура
- Shared types package
- Окремий matching engine
- Легко додати нові facets/vibe параметри
- Розширювані психологічні портрети

### Локалізація
- Централізована i18n структура
- 3 мови з можливістю розширення
- Переклади в базі даних (JSONB)

### Performance
- IndexedDB для швидкого доступу
- Service Worker caching
- Оптимізовані запити до БД
- Lazy loading компонентів

## 📦 Production Ready

- Environment variables
- Error handling
- Logging
- Database migrations
- Seed scripts
- Docker-ready
- Vercel/Railway compatible

## 🤝 Внесок

Проєкт має чисту, масштабовану архітектуру і готовий до розширення:
- Додавання нових ароматів через адмін-панель
- Створення додаткових квізів
- Розширення психологічних портретів
- Додавання нових мов

## 📄 Ліцензія

MIT

## 👥 Автори

Senior Full-Stack Developer Team

---

**Контакти та підтримка**: [your-email@example.com]

**Репозиторій**: [github.com/your-repo]
