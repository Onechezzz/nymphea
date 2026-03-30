# Contributing Guide

## Як долучитися до проєкту

Дякуємо за ваш інтерес до проєкту Aroma! Ми раді будь-якому внеску.

## Процес розробки

### 1. Fork репозиторію

### 2. Створіть гілку для вашої функції

```bash
git checkout -b feature/amazing-feature
```

### 3. Налаштуйте локальне середовище

Дотримуйтесь інструкцій з README.md

### 4. Внесіть зміни

- Дотримуйтесь існуючого code style
- Додайте коментарі для складної логіки
- Оновіть документацію при необхідності

### 5. Перевірте свої зміни

```bash
# Lint
npm run lint

# Build
npm run build

# Test (якщо є)
npm test
```

### 6. Commit

Використовуйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: додати новий facet parameter
fix: виправити помилку в алгоритмі підбору
docs: оновити API документацію
style: форматування коду
refactor: рефакторинг matching engine
test: додати тести для quiz
chore: оновити залежності
```

### 7. Push та Pull Request

```bash
git push origin feature/amazing-feature
```

Створіть Pull Request з описом змін.

## Code Style

### TypeScript
- Використовуйте TypeScript strict mode
- Уникайте `any` типів
- Використовуйте інтерфейси для об'єктів

### React/Next.js
- Функціональні компоненти з hooks
- Використовуйте Client Components (`'use client'`) тільки коли потрібно
- Дотримуйтесь App Router conventions

### Backend
- Async/await замість callbacks
- Error handling в try/catch
- Параметризовані SQL запити

### CSS/Styling
- Tailwind CSS utility classes
- Responsive mobile-first
- Використовуйте компонентні класи в globals.css

## Що можна покращити

### Високий пріоритет
- [ ] Unit тести
- [ ] E2E тести
- [ ] Error boundary компоненти
- [ ] Loading states
- [ ] Rate limiting

### Середній пріоритет
- [ ] Додаткові квізи (medium, long)
- [ ] Більше психологічних портретів (20 замість 3)
- [ ] Розширені фільтри в адмін-панелі
- [ ] Pagination для списку ароматів
- [ ] Історія змін ароматів

### Низький пріоритет
- [ ] Dark mode
- [ ] Accessibility improvements
- [ ] Додаткові мови
- [ ] Animation покращення
- [ ] SEO оптимізація

## Структура коду

### Додавання нового facet параметру

1. Оновіть `packages/shared-types/src/index.ts`:
```typescript
export interface Facets {
  // ... існуючі
  newParameter: number;
}
```

2. Оновіть seed в `apps/backend/src/db/seed.ts`

3. Оновіть форми в адмін-панелі

### Додавання нового квізу

1. Створіть питання в `apps/backend/src/db/seed.ts`
2. Квіз автоматично буде доступний через API

### Додавання нового психологічного портрету

1. Додайте профіль в seed
2. Додайте зображення в `apps/frontend/public/profiles/`

## Питання?

Відкрийте Issue з питанням або пропозицією!

## Код поведінки

- Будьте поважними
- Конструктивна критика
- Допомагайте іншим розробникам
- Документуйте свій код

## Ліцензія

Внесок в проєкт означає згоду з MIT ліцензією.
