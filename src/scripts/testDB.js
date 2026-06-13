import { pool } from "../config/db.js";

const result = await pool.query(
  "SELECT NOW()"
);

console.log(result.rows);

await pool.end();