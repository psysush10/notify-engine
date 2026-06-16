import { pool }
from "../config/db.js";

export const getProductsDb =
async () => {

  const result =
    await pool.query(
      `
      SELECT 
      product_code,
      product_name,
      description
      FROM api_products
      WHERE active = true
      ORDER BY product_name
      `
    );

  return result.rows;

};