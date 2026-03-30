# API Documentation

## Base URL

```
Development: http://localhost:3001
Production: https://your-api-domain.com
```

## Authentication

Більшість endpoints потребують JWT токен в заголовку:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /api/auth/login

Авторизація користувача

**Request:**

```json
{
  "email": "admin@aroma.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "admin@aroma.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "tokens": {
    "accessToken": "jwt_token"
  }
}
```

### GET /api/auth/me

Отримання поточного користувача (потребує auth)

**Response:**

```json
{
  "id": "uuid",
  "email": "admin@aroma.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Aromas Endpoints (Protected)

### GET /api/aromas

Отримання списку ароматів

**Query Parameters:**

- `search` (optional): Пошук по бренду або назві
- `gender` (optional): Фільтр по типу (male/female/unisex)
- `sortBy` (optional): Поле сортування (default: created_at)
- `order` (optional): Порядок (ASC/DESC, default: DESC)

**Response:**

```json
[
  {
    "id": "uuid",
    "brand": "Chanel",
    "gender": "female",
    "intensity": {
      "sillage": 0.7,
      "longevity": 0.8
    },
    "facets": {
      "freshness": 0.3,
      "sweetness": 0.6,
      ...
    },
    "vibe": {
      "day_night": 0.6,
      ...
    },
    "tags": ["elegant", "classic"],
    "i18n": {
      "uk": {
        "name": "Chanel No. 5",
        "shortDesc": "Культовий жіночий аромат",
        "style": "Класична елегантність"
      },
      ...
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/aromas/:id

Отримання аромату по ID

**Response:** Той самий формат, що і в списку

### POST /api/aromas

Створення нового аромату

**Request:**

```json
{
  "brand": "Dior",
  "gender": "male",
  "intensity": {
    "sillage": 0.8,
    "longevity": 0.7
  },
  "facets": {
    "freshness": 0.7,
    "sweetness": 0.3,
    "warmth": 0.5,
    "woodiness": 0.6,
    "florality": 0.2,
    "spiciness": 0.5,
    "clean_musk": 0.6,
    "powdery": 0.2,
    "green": 0.4,
    "citrus": 0.8,
    "ambery": 0.4
  },
  "vibe": {
    "day_night": 0.4,
    "formal_casual": 0.5,
    "introvert_extrovert": 0.6,
    "safe_provocative": 0.5
  },
  "tags": ["fresh", "sporty"],
  "i18n": {
    "uk": {
      "name": "Dior Sauvage",
      "shortDesc": "Свіжий чоловічий аромат",
      "style": "Сучасна мужність"
    },
    "ru": { ... },
    "en": { ... }
  }
}
```

**Response:** Створений аромат

### PUT /api/aromas/:id

Оновлення аромату

**Request:** Той самий формат, що і при створенні

**Response:** Оновлений аромат

### DELETE /api/aromas/:id

Видалення аромату

**Response:**

```json
{
  "message": "Aroma deleted successfully"
}
```

### POST /api/aromas/import

Імпорт ароматів з JSON

**Request:** Масив ароматів

**Response:**

```json
{
  "message": "Imported 5 aromas",
  "aromas": [...]
}
```

### GET /api/aromas/export/json

Експорт всіх ароматів у JSON

**Response:** JSON файл для завантаження

---

## Public Endpoints

### GET /api/public/snapshot

Отримання всіх даних для offline режиму (не потребує auth)

**Response:**

```json
{
  "aromas": [...],
  "quizzes": [...],
  "profiles": [...],
  "timestamp": 1234567890
}
```

### POST /api/public/quiz/submit

Відправка відповідей квізу (не потребує auth)

**Request:**

```json
{
  "gender": "female",
  "answers": [
    {
      "questionId": "q1",
      "optionId": "q1_female"
    },
    {
      "questionId": "q2",
      "optionId": "q2_evening"
    }
  ]
}
```

**Response:**

```json
{
  "profile": {
    "gender": "female",
    "facets": { ... },
    "vibe": { ... },
    "tags": [...]
  },
  "psychologicalProfile": {
    "id": "uuid",
    "name": {
      "uk": "Романтична Мрійниця",
      ...
    },
    "image": "/profiles/romantic-dreamer.jpg",
    "target": { ... }
  },
  "matches": [
    {
      "aroma": { ... },
      "score": 0.87,
      "breakdown": {
        "facetScore": 0.85,
        "vibeScore": 0.90,
        "tagScore": 0.75
      }
    }
  ]
}
```

---

## Error Responses

Всі endpoints можуть повернути помилки:

### 400 Bad Request

```json
{
  "error": "Invalid input",
  "details": { ... }
}
```

### 401 Unauthorized

```json
{
  "error": "Access token required"
}
```

### 403 Forbidden

```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

В production рекомендується додати rate limiting:

- 100 requests/minute для auth endpoints
- 1000 requests/minute для інших endpoints
