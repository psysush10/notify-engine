import { pool } from "../config/db.js";

export const createTenantConfigDb = async (
  tenantId
) => {

  const query = `
    INSERT INTO tenant_configs (
      tenant_id,
      slack_enabled,
      email_enabled,
      webhook_enabled
    )
    VALUES ($1, true, true, true)
    RETURNING *
  `;

  const result = await pool.query(
    query,
    [tenantId]
  );

  return result.rows[0];
};

export const getTenantConfigDb = async (
  tenantId
) => {


  const query = `
    SELECT *
    FROM tenant_configs
    WHERE tenant_id = $1
  `;

  const result = await pool.query(
    query,
    [tenantId]
  );


  return result.rows[0];
};

export const updateTenantConfigDb = async (
  tenantId,
  config
) => {

  const query = `
    UPDATE tenant_configs
    SET
      slack_enabled = COALESCE($2, slack_enabled),
      email_enabled = COALESCE($3, email_enabled),
      webhook_enabled = COALESCE($4, webhook_enabled),
      slack_webhook = COALESCE($5, slack_webhook),
      email_from = COALESCE($6, email_from),
      webhook_url = COALESCE($7, webhook_url),
      updated_at = CURRENT_TIMESTAMP
    WHERE tenant_id = $1
    RETURNING *
  `;

  const values = [
    tenantId,
    config.slackEnabled,
    config.emailEnabled,
    config.webhookEnabled,
    config.slackWebhook,
    config.emailFrom,
    config.webhookUrl
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};