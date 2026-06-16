import { pool }
from "../config/db.js";

export const getSubscriptionDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM subscriptions
      WHERE tenant_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [tenantId]
    );

  return result.rows[0];
};

export const expireActiveSubscriptionDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      UPDATE subscriptions
      SET
        status = 'EXPIRED',
        end_date = CURRENT_TIMESTAMP
      WHERE
        tenant_id = $1
        AND status = 'ACTIVE'
      `,
      [tenantId]
    );

  return result.rowCount;
};

export const createSubscriptionDb = async (
  tenantId,
  plan
) => {

  const result =
    await pool.query(
      `
      INSERT INTO subscriptions (

        tenant_id,
        plan,
        status,
        start_date

      )

      VALUES (

        $1,
        $2,
        'ACTIVE',
        CURRENT_TIMESTAMP

      )

      RETURNING *
      `,
      [
        tenantId,
        plan
      ]
    );

  return result.rows[0];
};