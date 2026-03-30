import pool from './index';

const createTables = async () => {
  try {
    console.log('Starting database migration...');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Aromas table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS aromas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        brand VARCHAR(255) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        intensity JSONB NOT NULL,
        facets JSONB NOT NULL,
        vibe JSONB NOT NULL,
        tags JSONB NOT NULL,
        i18n JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Quizzes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        type VARCHAR(20) NOT NULL,
        questions JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Profiles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name JSONB NOT NULL,
        image TEXT NOT NULL,
        target JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_aromas_gender ON aromas(gender);
      CREATE INDEX IF NOT EXISTS idx_aromas_brand ON aromas(brand);
      CREATE INDEX IF NOT EXISTS idx_quizzes_type ON quizzes(type);
    `);

    console.log('Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

createTables();
