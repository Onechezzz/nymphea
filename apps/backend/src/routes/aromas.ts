import { Router, Request, Response } from 'express';
import { query } from '../db';
import { AromaSchema, Aroma } from '@aroma/shared-types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get all aromas (protected)
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { search, gender, sortBy = 'created_at', order = 'DESC' } = req.query;

    let queryText = 'SELECT * FROM aromas WHERE 1=1';
    const queryParams: any[] = [];
    let paramCounter = 1;

    if (search) {
      queryText += ` AND (brand ILIKE $${paramCounter} OR i18n::text ILIKE $${paramCounter})`;
      queryParams.push(`%${search}%`);
      paramCounter++;
    }

    if (gender) {
      queryText += ` AND gender = $${paramCounter}`;
      queryParams.push(gender);
      paramCounter++;
    }

    queryText += ` ORDER BY ${sortBy} ${order}`;

    const result = await query(queryText, queryParams);

    const aromas = result.rows.map(row => ({
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json(aromas);
  } catch (error) {
    console.error('Get aromas error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get aroma by ID (protected)
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('SELECT * FROM aromas WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aroma not found' });
    }

    const row = result.rows[0];
    const aroma = {
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(aroma);
  } catch (error) {
    console.error('Get aroma error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create aroma (protected)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const validation = AromaSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid input', details: validation.error });
    }

    const aroma = validation.data;

    const result = await query(
      `INSERT INTO aromas (brand, gender, intensity, facets, vibe, tags, i18n)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
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

    const row = result.rows[0];
    const createdAroma = {
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.status(201).json(createdAroma);
  } catch (error) {
    console.error('Create aroma error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update aroma (protected)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = AromaSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid input', details: validation.error });
    }

    const aroma = validation.data;

    const result = await query(
      `UPDATE aromas 
       SET brand = $1, gender = $2, intensity = $3, facets = $4, 
           vibe = $5, tags = $6, i18n = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        aroma.brand,
        aroma.gender,
        JSON.stringify(aroma.intensity),
        JSON.stringify(aroma.facets),
        JSON.stringify(aroma.vibe),
        JSON.stringify(aroma.tags),
        JSON.stringify(aroma.i18n),
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aroma not found' });
    }

    const row = result.rows[0];
    const updatedAroma = {
      id: row.id,
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    res.json(updatedAroma);
  } catch (error) {
    console.error('Update aroma error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete aroma (protected)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM aromas WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aroma not found' });
    }

    res.json({ message: 'Aroma deleted successfully' });
  } catch (error) {
    console.error('Delete aroma error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Import aromas (protected)
router.post('/import', authenticateToken, async (req: Request, res: Response) => {
  try {
    const aromas = req.body;

    if (!Array.isArray(aromas)) {
      return res.status(400).json({ error: 'Expected array of aromas' });
    }

    const imported = [];

    for (const aromaData of aromas) {
      const validation = AromaSchema.safeParse(aromaData);

      if (!validation.success) {
        continue; // Skip invalid aromas
      }

      const aroma = validation.data;

      const result = await query(
        `INSERT INTO aromas (brand, gender, intensity, facets, vibe, tags, i18n)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
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

      imported.push(result.rows[0]);
    }

    res.json({ message: `Imported ${imported.length} aromas`, aromas: imported });
  } catch (error) {
    console.error('Import aromas error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export aromas (protected)
router.get('/export/json', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM aromas ORDER BY created_at DESC');

    const aromas = result.rows.map(row => ({
      brand: row.brand,
      gender: row.gender,
      intensity: row.intensity,
      facets: row.facets,
      vibe: row.vibe,
      tags: row.tags,
      i18n: row.i18n,
    }));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=aromas.json');
    res.json(aromas);
  } catch (error) {
    console.error('Export aromas error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
