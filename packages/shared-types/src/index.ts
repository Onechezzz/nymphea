import { z } from 'zod';

// ========== Enums ==========

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

export enum Language {
  UK = 'uk',
  RU = 'ru',
  EN = 'en'
}

export enum QuizType {
  FAST = 'fast',
  MEDIUM = 'medium',
  LONG = 'long'
}

// ========== Aroma Types ==========

export interface Facets {
  freshness: number;      // 0..1
  sweetness: number;      // 0..1
  warmth: number;         // 0..1
  woodiness: number;      // 0..1
  florality: number;      // 0..1
  spiciness: number;      // 0..1
  clean_musk: number;     // 0..1
  powdery: number;        // 0..1
  green: number;          // 0..1
  citrus: number;         // 0..1
  ambery: number;         // 0..1
}

export interface Vibe {
  day_night: number;              // 0 = day, 1 = night
  formal_casual: number;          // 0 = formal, 1 = casual
  introvert_extrovert: number;    // 0 = introvert, 1 = extrovert
  safe_provocative: number;       // 0 = safe, 1 = provocative
}

export interface Intensity {
  sillage: number;     // 0..1
  longevity: number;   // 0..1
}

export interface I18nContent {
  name: string;
  shortDesc: string;
  style: string;
}

export interface AromaI18n {
  uk: I18nContent;
  ru: I18nContent;
  en: I18nContent;
}

export interface Aroma {
  id: string;
  brand: string;
  gender: Gender;
  intensity: Intensity;
  facets: Facets;
  vibe: Vibe;
  tags: string[];
  i18n: AromaI18n;
  createdAt?: Date;
  updatedAt?: Date;
}

// ========== Quiz Types ==========

export interface QuizAnswer {
  facets?: Partial<Facets>;
  vibe?: Partial<Vibe>;
  tags?: string[];
  weight?: number;
}

export interface QuizOption {
  id: string;
  i18n: {
    uk: string;
    ru: string;
    en: string;
  };
  answer: QuizAnswer;
}

export interface QuizQuestion {
  id: string;
  i18n: {
    uk: string;
    ru: string;
    en: string;
  };
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  type: QuizType;
  questions: QuizQuestion[];
}

// ========== Profile Types ==========

export interface ProfileI18n {
  uk: string;
  ru: string;
  en: string;
}

export interface Profile {
  id: string;
  name: ProfileI18n;
  image: string;
  target: {
    facets: Facets;
    vibe: Vibe;
  };
}

// ========== User Profile ==========

export interface UserProfile {
  gender: Gender;
  facets: Facets;
  vibe: Vibe;
  tags: string[];
}

// ========== Matching Result ==========

export interface MatchingResult {
  aroma: Aroma;
  score: number;
  breakdown: {
    facetScore: number;
    vibeScore: number;
    tagScore: number;
  };
}

export interface QuizResult {
  profile: UserProfile;
  psychologicalProfile: Profile;
  matches: MatchingResult[];
}

// ========== Auth Types ==========

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
}

export interface AuthTokens {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'passwordHash'>;
  tokens: AuthTokens;
}

// ========== Snapshot (for offline) ==========

export interface Snapshot {
  aromas: Aroma[];
  quizzes: Quiz[];
  profiles: Profile[];
  timestamp: number;
}

// ========== Zod Schemas ==========

const FacetsSchema = z.object({
  freshness: z.number().min(0).max(1),
  sweetness: z.number().min(0).max(1),
  warmth: z.number().min(0).max(1),
  woodiness: z.number().min(0).max(1),
  florality: z.number().min(0).max(1),
  spiciness: z.number().min(0).max(1),
  clean_musk: z.number().min(0).max(1),
  powdery: z.number().min(0).max(1),
  green: z.number().min(0).max(1),
  citrus: z.number().min(0).max(1),
  ambery: z.number().min(0).max(1),
});

const VibeSchema = z.object({
  day_night: z.number().min(0).max(1),
  formal_casual: z.number().min(0).max(1),
  introvert_extrovert: z.number().min(0).max(1),
  safe_provocative: z.number().min(0).max(1),
});

const IntensitySchema = z.object({
  sillage: z.number().min(0).max(1),
  longevity: z.number().min(0).max(1),
});

const I18nContentSchema = z.object({
  name: z.string(),
  shortDesc: z.string(),
  style: z.string(),
});

const AromaI18nSchema = z.object({
  uk: I18nContentSchema,
  ru: I18nContentSchema,
  en: I18nContentSchema,
});

export const AromaSchema = z.object({
  id: z.string().optional(),
  brand: z.string().min(1),
  gender: z.nativeEnum(Gender),
  intensity: IntensitySchema,
  facets: FacetsSchema,
  vibe: VibeSchema,
  tags: z.array(z.string()),
  i18n: AromaI18nSchema,
});

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const QuizAnswerSchema = z.object({
  gender: z.nativeEnum(Gender),
  answers: z.array(z.object({
    questionId: z.string(),
    optionId: z.string(),
  })),
});
