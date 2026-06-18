CREATE TABLE IF NOT EXISTS migrations (

  id SERIAL PRIMARY KEY,

  migration_name VARCHAR(255)
  UNIQUE,

  executed_at TIMESTAMP
  DEFAULT NOW()

);