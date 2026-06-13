import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notify_engine",
  password: "postgres",
  port: 5432,
});