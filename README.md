# 🌸 Aroma - Perfume Selection App

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Веб-застосунок для персонального підбору парфуму на основі психологічного квізу з offline-first підходом.

## ✨ Особливості

- 🎯 **Інтелектуальний підбір** - Алгоритм на базі 15 параметрів (facets, vibe, tags)
- 🧠 **Психологічні портрети** - Визначення особистості користувача
- 🌍 **Мультимовність** - Українська, російська, англійська
- 📱 **PWA** - Працює як додаток, offline після першого завантаження
- 🎨 **Сучасний UI** - Мінімалістичний дизайн з Tailwind CSS
- 🔐 **Безпека** - JWT аутентифікація, Bcrypt, валідація
- 📊 **Адмін-панель** - Повне керування ароматами

## 🚀 Швидкий старт

**Детальна інструкція**: [QUICKSTART.md](./QUICKSTART.md)

```bash
# 1. Встановлення
npm install

# 2. Створення БД
createdb aroma

# 3. Міграції та seed
npm run db:migrate
npm run db:seed

# 4. Запуск
npm run dev
```

**Відкрийте:** http://localhost:3000

**Тестовий акаунт:** admin@aroma.com / admin123

## 📁 Структура проєкту

```
aroma/
├── apps/
│   ├── backend/              # Node.js + Express + PostgreSQL
│   │   ├── src/
│   │   │   ├── db/          # Міграції, seeds
│   │   │   ├── routes/      # API endpoints
│   │   │   ├── middleware/  # Auth, validation
│   │   │   └── index.ts     # Entry point
│   │   └── package.json
│   │
│   └── frontend/             # Next.js 14 App Router
│       ├── src/
│       │   ├── app/         # Pages (admin, quiz, results)
│       │   │   ├── admin/
│       │   │   ├── quiz/
│       │   │   └── page.tsx
│       │   └── lib/         # API client, IndexedDB
│       ├── public/          # PWA manifest, Service Worker
│       └── package.json
│
├── packages/
│   ├── shared-types/        # TypeScript types + Zod schemas
│   └── matching-engine/     # Алгоритм підбору
│
├── .vscode/                 # VSCode конфігурація
├── docker-compose.yml       # Docker setup
├── API.md                   # API документація
├── DEPLOYMENT.md            # Production deploy
└── README.md
```

## 🛠️ Технології

### Frontend
- **Next.js 14** - App Router, Server Components
- **React 18** - Hooks, Client Components
- **TypeScript** - Strict mode
- **Tailwind CSS** - Utility-first styling
- **idb** - IndexedDB wrapper
- **PWA** - Service Worker, offline-first

### Backend
- **Node.js** - Runtime
- **Express** - REST API
- **PostgreSQL** - Database (JSONB)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation

### DevOps
- **Monorepo** - npm workspaces
- **TypeScript** - Shared types
- **Docker** - Containerization
- **VSCode** - Debug configs

## 🎯 Функціонал

### Для користувачів

1. **Вибір мови** - uk/ru/en
2. **Проходження квізу** - 10 питань про переваги
3. **Отримання результатів**:
   - Психологічний портрет
   - Топ-10 найкращих парфумів
   - Процент відповідності
   - Опис кожного аромату

### Для адміністраторів

- ✏️ Створення/редагування/видалення ароматів
- 🔍 Пошук та фільтрація
- 📥 Імпорт ароматів з JSON
- 📤 Експорт всіх ароматів
- 🎚️ Налаштування facets (11 параметрів)
- 🎭 Налаштування vibe (4 параметри)
- 🏷️ Додавання тегів
- 🌐 Переклади на 3 мови

## 📊 Алгоритм підбору

### Формула

```
total_score = 0.65 × facetScore + 0.25 × vibeScore + 0.10 × tagScore
```

### Параметри

**Facets (11 параметрів 0-1):**
```
freshness, sweetness, warmth, woodiness, florality,
spiciness, clean_musk, powdery, green, citrus, ambery
```

**Vibe (4 параметри 0-1):**
```
day_night         → 0=день, 1=ніч
formal_casual     → 0=формально, 1=казуально
introvert_extrovert → 0=інтроверт, 1=екстраверт
safe_provocative  → 0=безпечно, 1=провокаційно
```

**Гендерний фільтр:**
- `male` → male + unisex
- `female` → female + unisex
- `unisex` → тільки unisex

**Обчислення:** Евклідова відстань у багатовимірному просторі

## 📡 API

**Повна документація:** [API.md](./API.md)

### Основні endpoints

```
POST   /api/auth/login           - Авторизація
GET    /api/auth/me              - Поточний користувач

GET    /api/aromas               - Список ароматів
POST   /api/aromas               - Створити аромат
PUT    /api/aromas/:id           - Оновити аромат
DELETE /api/aromas/:id           - Видалити аромат
POST   /api/aromas/import        - Імпорт JSON
GET    /api/aromas/export/json   - Експорт JSON

GET    /api/public/snapshot      - Дані для offline
POST   /api/public/quiz/submit   - Відправити квіз
```

## 💾 Offline-first

### Як працює

1. **Перше завантаження** - Snapshot з бекенду → IndexedDB
2. **Service Worker** - Кешує UI та assets
3. **Локальна робота** - Квіз працює з IndexedDB
4. **Обчислення** - Matching engine на клієнті

### Що працює offline

- ✅ Весь квіз
- ✅ Алгоритм підбору
- ✅ Результати
- ✅ UI застосунку

### Що потребує online

- ❌ Адмін-панель
- ❌ Створення/редагування ароматів
- ❌ Оновлення snapshot

## 🚢 Production Deploy

**Повна інструкція:** [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick deploy

```bash
# Build
npm run build

# Environment
cp .env.example .env
# Відредагуйте змінні

# Start
npm start
```

### Docker

```bash
docker-compose up -d
```

### Платформи

- **Frontend:** Vercel, Netlify
- **Backend:** Railway, Render, Heroku
- **Database:** Supabase, Neon, Railway

## 🧪 Seed дані

Автоматично створюється:

- **5 ароматів**: Chanel, Dior, Tom Ford, YSL, Prada
- **1 квіз**: 10 питань (швидкий)
- **3 портрети**: Романтична Мрійниця, Впевнений Лідер, Загадкова Особистість
- **1 адмін**: admin@aroma.com / admin123

## 📖 Документація

- [API.md](./API.md) - Повна API документація
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production розгортання
- [QUICKSTART.md](./QUICKSTART.md) - Швидкий старт за 5 хвилин
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Як долучитися
- [CHANGELOG.md](./CHANGELOG.md) - Історія змін
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Детальний огляд

## 🤝 Contributing

Contributions are welcome! Див. [CONTRIBUTING.md](./CONTRIBUTING.md)

### Що можна покращити

- [ ] Unit тести (Jest)
- [ ] E2E тести (Playwright)
- [ ] Додаткові квізи (medium, long)
- [ ] Більше психологічних портретів (20 замість 3)
- [ ] Rate limiting
- [ ] Analytics dashboard
- [ ] ML рекомендації

## 📝 Ліцензія

MIT License - див. [LICENSE](./LICENSE)

## 👥 Автори

Created with ❤️ by Senior Full-Stack Team

## 🙏 Подяки

- Next.js team за чудовий фреймворк
- PostgreSQL за надійну БД
- Tailwind CSS за зручний styling

---

**⭐ Поставте зірку, якщо проєкт вам сподобався!**

**📧 Контакти**: your-email@example.com
