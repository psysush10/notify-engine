CREATE TABLE tenant_users (

  id SERIAL PRIMARY KEY,

  tenant_id VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL,

  role VARCHAR(50) NOT NULL,

  status VARCHAR(20)
    DEFAULT 'ACTIVE',

  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (
    tenant_id,
    email
  )

);