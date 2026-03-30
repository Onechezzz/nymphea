# Changelog

## [1.0.0] - 2024-01-01

### Додано
- ✨ Повнофункціональна система підбору парфуму
- 🎯 Алгоритм підбору на базі facets, vibe та tags
- 📱 PWA з offline-first підходом
- 🌍 Мультимовність (uk/ru/en)
- 🔐 JWT авторизація для адмін-панелі
- 📊 CRUD операції для ароматів
- 🧠 Психологічні портрети користувачів
- 💾 IndexedDB для локального зберігання
- 📥 Імпорт/експорт ароматів у JSON
- 🎨 Мінімалістичний UI з Tailwind CSS
- 📦 Monorepo структура з shared packages
- 🗄️ PostgreSQL з JSONB для гнучкого зберігання
- ✅ Zod валідація на frontend і backend
- 🚀 Production-ready конфігурація

### Backend
- Express REST API
- JWT аутентифікація
- PostgreSQL migrations
- Seed scripts з тестовими даними
- Error handling та logging
- CORS налаштування

### Frontend
- Next.js 14 App Router
- TypeScript strict mode
- Responsive tablet-first дизайн
- Service Worker для offline
- IndexedDB integration
- Dynamic routing для адмін-панелі

### Документація
- API документація
- Deployment guide
- Project overview
- README з швидким стартом

## Roadmap

### [1.1.0] - Планується
- [ ] Unit тести (Jest)
- [ ] E2E тести (Playwright)
- [ ] Rate limiting
- [ ] Розширені фільтри в адмін-панелі
- [ ] Історія результатів квізів
- [ ] Експорт результатів у PDF
- [ ] Analytics dashboard

### [1.2.0] - Планується
- [ ] Рекомендації на базі ML
- [ ] Інтеграція з perfume API
- [ ] Соціальний шеринг результатів
- [ ] Користувацькі профілі
- [ ] Збережені улюблені аромати
- [ ] Порівняння ароматів

### [2.0.0] - Планується
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Real-time оновлення
- [ ] Розширена аналітика
- [ ] A/B тестування квізів
- [ ] Інтеграція з e-commerce
