import { pool }
from "../config/db.js";

export const getTenantProductsDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      SELECT
        product_code,
        enabled
      FROM tenant_products
      WHERE tenant_id = $1
      `,
      [tenantId]
    );

  return result.rows;

};


export const enableTenantProductDb = async (
  tenantId,
  productCode
) => {

  const result =
    await pool.query(
      `
      INSERT INTO tenant_products (

        tenant_id,
        product_code,
        enabled

      )

      VALUES (

        $1,
        $2,
        true

      )

      ON CONFLICT
      DO NOTHING

      RETURNING *
      `,
      [
        tenantId,
        productCode
      ]
    );

  return result.rows[0];
};