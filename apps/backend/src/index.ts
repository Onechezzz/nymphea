import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import aromasRoutes from './routes/aromas';
import publicRoutes from './routes/public';
import { createTables } from './db/migrate';
import { seedData } from './db/seed';
import pool from './db/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/aromas', aromasRoutes);
app.use('/api/public', publicRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Run migrations, seed if empty, then start server
createTables()
  .then(async () => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(rows[0].count, 10) === 0) {
      console.log('Empty database detected, running seed...');
      await seedData();
    }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
