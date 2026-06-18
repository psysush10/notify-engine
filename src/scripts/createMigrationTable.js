import pool from "../config/db.js";

const run = async () => {

  await pool.query(`

    CREATE TABLE IF NOT EXISTS migrations (

      id SERIAL PRIMARY KEY,

      migration_name VARCHAR(255)
      UNIQUE,

      executed_at TIMESTAMP
      DEFAULT NOW()

    )

  `);

  console.log(
    "Migration table ready"
  );

  process.exit(0);

};

run();