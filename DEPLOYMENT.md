# Інструкції з розгортання

## Попередні вимоги

- Node.js 18+ і npm
- PostgreSQL 14+
- Git

## Локальне розгортання

### 1. Клонування репозиторію

```bash
git clone <repo-url>
cd aroma
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування бази даних

Створіть PostgreSQL базу даних:

```sql
CREATE DATABASE aroma;
```

Створіть файл `apps/backend/.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aroma
JWT_SECRET=your_very_long_secret_key_at_least_32_characters
PORT=3001
NODE_ENV=development
```

### 4. Запуск міграцій та seed

```bash
npm run db:migrate
npm run db:seed
```

### 5. Налаштування frontend

Створіть файл `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 6. Запуск проєкту

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 7. Тестовий акаунт

- Email: admin@aroma.com
- Password: admin123

## Production розгортання

### Backend (Node.js)

1. Встановіть змінні оточення:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=secure_random_32_character_string
PORT=3001
NODE_ENV=production
```

2. Збудуйте проєкт:

```bash
cd apps/backend
npm run build
```

3. Запустіть:

```bash
npm start
```

Рекомендовано використовувати PM2:

```bash
npm install -g pm2
pm2 start dist/index.js --name aroma-backend
```

### Frontend (Next.js)

1. Встановіть змінні оточення:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

2. Збудуйте проєкт:

```bash
cd apps/frontend
npm run build
```

3. Запустіть:

```bash
npm start
```

Або використовуйте PM2:

```bash
pm2 start npm --name aroma-frontend -- start
```

### Розгортання на Vercel (Frontend)

1. Підключіть репозиторій до Vercel
2. Встановіть Root Directory: `apps/frontend`
3. Додайте змінні оточення:
   - `NEXT_PUBLIC_API_URL`: URL вашого backend API
4. Deploy

### Розгортання на Railway/Render (Backend)

1. Підключіть репозиторій
2. Встановіть Root Directory: `apps/backend`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Додайте змінні оточення (DATABASE_URL, JWT_SECRET)
6. Додайте PostgreSQL addon

### Розгортання на Docker

Створіть `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: aroma
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./apps/backend
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/aroma
      JWT_SECRET: your_secret_key_change_in_production
      PORT: 3001
      NODE_ENV: production
    ports:
      - "3001:3001"
    depends_on:
      - postgres

  frontend:
    build: ./apps/frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Запуск:

```bash
docker-compose up -d
```

## Troubleshooting

### Помилка підключення до БД

Перевірте:
- PostgreSQL запущений
- DATABASE_URL правильний
- Користувач має права на створення таблиць

### Frontend не може з'єднатися з backend

Перевірте:
- Backend запущений на правильному порту
- NEXT_PUBLIC_API_URL правильний
- CORS налаштований (вже включено в backend)

### Service Worker не працює

Service Worker працює тільки:
- На localhost
- На HTTPS в production
- Перевірте консоль браузера

## Моніторинг

Рекомендовані інструменти:
- PM2 для управління процесами
- PostgreSQL backups (pg_dump)
- Application monitoring (Sentry, LogRocket)
- Uptime monitoring (UptimeRobot, Pingdom)

## Backup

Регулярно робіть backup бази даних:

```bash
pg_dump -U postgres aroma > backup_$(date +%Y%m%d).sql
```

Відновлення:

```bash
psql -U postgres aroma < backup_20240101.sql
```
