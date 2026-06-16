import { pool } from "../config/db.js";

export const createTenantDb = async (
  tenantId,
  tenantName
) => {

  const query = `
    INSERT INTO tenants (
      tenant_id,
      tenant_name
    )
    VALUES ($1,$2)
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [tenantId, tenantName]
    );

  return result.rows[0];
};

export const getAllTenantsDb = async () => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM tenants
      ORDER BY created_at DESC
      `
    );

  return result.rows;
};

export const getTenantByIdDb =async (tenantId) => {

 const result =
  await pool.query(
   `
   SELECT *
   FROM tenants
   WHERE tenant_id=$1
   `,
   [tenantId]
  );

 return result.rows[0];
};

export const updateTenantPlanDb = async (
  tenantId,
  plan
) => {

  const result =
    await pool.query(
      `
      UPDATE tenants
      SET plan = $2
      WHERE tenant_id = $1
      RETURNING *
      `,
      [
        tenantId,
        plan
      ]
    );

  return result.rows[0];
};