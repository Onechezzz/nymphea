import {
  Aroma,
  UserProfile,
  Profile,
  MatchingResult,
  QuizResult,
  Gender,
  Facets,
  Vibe,
} from '@aroma/shared-types';

// ========== Utility Functions ==========

/**
 * Обчислює Евклідову відстань між двома векторами
 */
function euclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  
  const sum = a.reduce((acc, val, i) => {
    const diff = val - b[i];
    return acc + diff * diff;
  }, 0);
  
  return Math.sqrt(sum);
}

/**
 * Нормалізує відстань до схожості (0..1, де 1 = ідеальна схожість)
 */
function distanceToSimilarity(distance: number, maxDistance: number): number {
  return Math.max(0, 1 - distance / maxDistance);
}

/**
 * Конвертує Facets у вектор
 */
function facetsToVector(facets: Facets): number[] {
  return [
    facets.freshness,
    facets.sweetness,
    facets.warmth,
    facets.woodiness,
    facets.florality,
    facets.spiciness,
    facets.clean_musk,
    facets.powdery,
    facets.green,
    facets.citrus,
    facets.ambery,
  ];
}

/**
 * Конвертує Vibe у вектор
 */
function vibeToVector(vibe: Vibe): number[] {
  return [
    vibe.day_night,
    vibe.formal_casual,
    vibe.introvert_extrovert,
    vibe.safe_provocative,
  ];
}

// ========== Matching Functions ==========

/**
 * Обчислює схожість facets (0..1)
 */
export function calculateFacetScore(
  userFacets: Facets,
  aromaFacets: Facets
): number {
  const userVector = facetsToVector(userFacets);
  const aromaVector = facetsToVector(aromaFacets);
  
  // Максимальна можлива відстань для 11 параметрів (0..1)
  const maxDistance = Math.sqrt(11);
  const distance = euclideanDistance(userVector, aromaVector);
  
  return distanceToSimilarity(distance, maxDistance);
}

/**
 * Обчислює схожість vibe (0..1)
 */
export function calculateVibeScore(userVibe: Vibe, aromaVibe: Vibe): number {
  const userVector = vibeToVector(userVibe);
  const aromaVector = vibeToVector(aromaVibe);
  
  // Максимальна можлива відстань для 4 параметрів (0..1)
  const maxDistance = Math.sqrt(4);
  const distance = euclideanDistance(userVector, aromaVector);
  
  return distanceToSimilarity(distance, maxDistance);
}

/**
 * Обчислює схожість тегів (Jaccard similarity)
 */
export function calculateTagScore(
  userTags: string[],
  aromaTags: string[]
): number {
  if (userTags.length === 0 || aromaTags.length === 0) {
    return 0;
  }
  
  const userSet = new Set(userTags);
  const aromaSet = new Set(aromaTags);
  
  const intersection = new Set(
    [...userSet].filter(tag => aromaSet.has(tag))
  );
  
  const union = new Set([...userSet, ...aromaSet]);
  
  return intersection.size / union.size;
}

/**
 * Обчислює загальний score для аромату
 */
export function calculateTotalScore(
  userProfile: UserProfile,
  aroma: Aroma
): MatchingResult {
  const facetScore = calculateFacetScore(userProfile.facets, aroma.facets);
  const vibeScore = calculateVibeScore(userProfile.vibe, aroma.vibe);
  const tagScore = calculateTagScore(userProfile.tags, aroma.tags);
  
  const totalScore = 
    0.65 * facetScore +
    0.25 * vibeScore +
    0.10 * tagScore;
  
  return {
    aroma,
    score: totalScore,
    breakdown: {
      facetScore,
      vibeScore,
      tagScore,
    },
  };
}

/**
 * Фільтрує аромати за гендером
 */
export function filterByGender(aromas: Aroma[], gender: Gender): Aroma[] {
  switch (gender) {
    case Gender.MALE:
      return aromas.filter(a => 
        a.gender === Gender.MALE || a.gender === Gender.UNISEX
      );
    case Gender.FEMALE:
      return aromas.filter(a => 
        a.gender === Gender.FEMALE || a.gender === Gender.UNISEX
      );
    case Gender.UNISEX:
      return aromas.filter(a => a.gender === Gender.UNISEX);
    default:
      return aromas;
  }
}

/**
 * Знаходить найближчий психологічний профіль
 */
export function findClosestProfile(
  userProfile: UserProfile,
  profiles: Profile[]
): Profile {
  let closestProfile = profiles[0];
  let minDistance = Infinity;
  
  for (const profile of profiles) {
    const facetVector1 = facetsToVector(userProfile.facets);
    const facetVector2 = facetsToVector(profile.target.facets);
    const facetDistance = euclideanDistance(facetVector1, facetVector2);
    
    const vibeVector1 = vibeToVector(userProfile.vibe);
    const vibeVector2 = vibeToVector(profile.target.vibe);
    const vibeDistance = euclideanDistance(vibeVector1, vibeVector2);
    
    // Комбінована відстань
    const totalDistance = facetDistance + vibeDistance;
    
    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      closestProfile = profile;
    }
  }
  
  return closestProfile;
}

/**
 * Головна функція: підбір ароматів
 */
export function matchAromas(
  userProfile: UserProfile,
  aromas: Aroma[],
  profiles: Profile[]
): QuizResult {
  // 1. Фільтруємо за гендером
  const filteredAromas = filterByGender(aromas, userProfile.gender);
  
  // 2. Обчислюємо scores
  const matches = filteredAromas
    .map(aroma => calculateTotalScore(userProfile, aroma))
    .sort((a, b) => b.score - a.score);
  
  // 3. Знаходимо психологічний профіль
  const psychologicalProfile = findClosestProfile(userProfile, profiles);
  
  return {
    profile: userProfile,
    psychologicalProfile,
    matches,
  };
}

// ========== Export ==========

export default {
  calculateFacetScore,
  calculateVibeScore,
  calculateTagScore,
  calculateTotalScore,
  filterByGender,
  findClosestProfile,
  matchAromas,
};
