CREATE TABLE IF NOT EXISTS import_jobs (

  id SERIAL PRIMARY KEY,

  tenant_id VARCHAR(255) NOT NULL,

  job_type VARCHAR(50) NOT NULL,

  file_name VARCHAR(255),

  status VARCHAR(50) NOT NULL,

  rows_processed INTEGER DEFAULT 0,

  rows_failed INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),

  completed_at TIMESTAMP

);