import { Router, Request, Response } from 'express';
import { query } from '../db';
import { matchAromas } from '@aroma/matching-engine';
import { 
  QuizAnswerSchema, 
  UserProfile, 
  Aroma, 
  Profile,
  Snapshot 
} from '@aroma/shared-types';

const router = Router();

// Get snapshot (all data for offline)
router.get('/snapshot', async (req: Request, res: Response) => {
  try {
    // Get aromas
    const aromasResult = await query('SELECT * FROM aromas');
    const aromas = aromasResult.rows.map(row => ({
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
    }));

    // Get quizzes
    const quizzesResult = await query('SELECT * FROM quizzes');
    const quizzes = quizzesResult.rows.map(row => ({
      id: row.id,
      type: row.type,
      questions: row.questions,
    }));

    // Get profiles
    const profilesResult = await query('SELECT * FROM profiles');
    const profiles = profilesResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      image: row.image,
      target: row.target,
    }));

    const snapshot: Snapshot = {
      aromas,
      quizzes,
      profiles,
      timestamp: Date.now(),
    };

    res.json(snapshot);
  } catch (error) {
    console.error('Get snapshot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit quiz and get results
router.post('/quiz/submit', async (req: Request, res: Response) => {
  try {
    const validation = QuizAnswerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid input', details: validation.error });
    }

    const { gender, answers } = validation.data;

    // Get quiz questions
    const quizResult = await query('SELECT * FROM quizzes LIMIT 1');
    
    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];
    const questions = quiz.questions;

    // Build user profile from answers
    const userProfile: UserProfile = {
      gender,
      facets: {
        freshness: 0,
        sweetness: 0,
        warmth: 0,
        woodiness: 0,
        florality: 0,
        spiciness: 0,
        clean_musk: 0,
        powdery: 0,
        green: 0,
        citrus: 0,
        ambery: 0,
      },
      vibe: {
        day_night: 0,
        formal_casual: 0,
        introvert_extrovert: 0,
        safe_provocative: 0,
      },
      tags: [],
    };

    const facetCounts: { [key: string]: number } = {};
    const vibeCounts: { [key: string]: number } = {};

    // Process answers
    for (const answer of answers) {
      const question = questions.find((q: any) => q.id === answer.questionId);
      if (!question) continue;

      const option = question.options.find((o: any) => o.id === answer.optionId);
      if (!option || !option.answer) continue;

      const answerData = option.answer;

      // Aggregate facets
      if (answerData.facets) {
        for (const [key, value] of Object.entries(answerData.facets)) {
          if (userProfile.facets.hasOwnProperty(key)) {
            userProfile.facets[key as keyof typeof userProfile.facets] += value as number;
            facetCounts[key] = (facetCounts[key] || 0) + 1;
          }
        }
      }

      // Aggregate vibe
      if (answerData.vibe) {
        for (const [key, value] of Object.entries(answerData.vibe)) {
          if (userProfile.vibe.hasOwnProperty(key)) {
            userProfile.vibe[key as keyof typeof userProfile.vibe] += value as number;
            vibeCounts[key] = (vibeCounts[key] || 0) + 1;
          }
        }
      }

      // Collect tags
      if (answerData.tags) {
        userProfile.tags.push(...answerData.tags);
      }
    }

    // Average facets
    for (const key in facetCounts) {
      userProfile.facets[key as keyof typeof userProfile.facets] /= facetCounts[key];
    }

    // Average vibe
    for (const key in vibeCounts) {
      userProfile.vibe[key as keyof typeof userProfile.vibe] /= vibeCounts[key];
    }

    // Get aromas and profiles
    const aromasResult = await query('SELECT * FROM aromas');
    const aromas: Aroma[] = aromasResult.rows.map(row => ({
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
    }));

    const profilesResult = await query('SELECT * FROM profiles');
    const profiles: Profile[] = profilesResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      image: row.image,
      target: row.target,
    }));

    // Calculate matches
    const result = matchAromas(userProfile, aromas, profiles);

    res.json(result);
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
