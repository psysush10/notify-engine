import { pool } from "../config/db.js";

export const createApiKeyDb = async (
  apiKey,
  tenantId
) => {

  const query = `
    INSERT INTO api_keys (
      api_key,
      tenant_id
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const result = await pool.query(
    query,
    [apiKey, tenantId]
  );

  return result.rows[0];
};

export const getTenantByApiKeyDb = async (
  apiKey
) => {

  const query = `
    SELECT
      t.tenant_id,
      t.tenant_name
    FROM api_keys a
    JOIN tenants t
      ON a.tenant_id = t.tenant_id
    WHERE a.api_key = $1
  `;

  const result = await pool.query(
    query,
    [apiKey]
  );

  return result.rows[0];
};