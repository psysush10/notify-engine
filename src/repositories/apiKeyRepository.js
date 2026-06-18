import { pool } from "../config/db.js";
import { platformConfig } from "../config/index.js"

export const createApiKeyDb = async (
  apiKeyHash,
  tenantId,
  expiresAt
) => {

  console.log("CREATING API KEY FOR ", tenantId);

  const query = `
    INSERT INTO api_keys (
      api_key_hash,
      tenant_id,
      expires_at
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(
    query,
    [apiKeyHash, tenantId]
  );

  return result.rows[0];
};

export const getTenantByApiKeyDb = async (
apiKey
) => {

  const query = `
    SELECT
      t.tenant_id,
      t.tenant_name,
      t.plan,
      a.expires_at
    FROM api_keys a
    JOIN tenants t
      ON a.tenant_id = t.tenant_id
    WHERE a.api_key_hash = $1
  `;

  const result = await pool.query(
    query,
    [apiKey]
  );

  return result.rows[0];
};

export const getApiKeyDb = async (
  tenantId
) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM api_keys
      WHERE tenant_id = $1
      `,
      [tenantId]
    );

  return result.rows[0];

};

export const deleteApiKeyDb = async (
  tenantId
) => {

  await pool.query(
    `
    DELETE
    FROM api_keys
    WHERE tenant_id = $1
    `,
    [tenantId]
  );

};