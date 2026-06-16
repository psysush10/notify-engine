import { pool }
  from "../config/db.js";

export const incrementUsageDb = async (tenantId) => {

    const query = `
      INSERT INTO tenant_usage (

        tenant_id,
        usage_date,
        events_processed

      )
      VALUES (

        $1,
        CURRENT_DATE,
        1

      )

      ON CONFLICT (
        tenant_id,
        usage_date
      )

      DO UPDATE SET

      events_processed =
        tenant_usage.events_processed + 1

      RETURNING *
    `;

    const result =
      await pool.query(
        query,
        [tenantId]
      );

    return result.rows[0];
  };

export const getTodayUsageDb = async (tenantId) => {

    const query = `
      SELECT
        events_processed
      FROM tenant_usage
      WHERE
        tenant_id = $1
        AND usage_date = CURRENT_DATE
    `;

    const result =
      await pool.query(
        query,
        [tenantId]
      );

    return result.rows[0];
  };

export const getMonthlyUsageDb = async (tenantId) => {

  const query = `
    SELECT
      COALESCE(
        SUM(events_processed),
        0
      ) AS total_usage

    FROM tenant_usage

    WHERE
      tenant_id = $1

      AND DATE_TRUNC(
        'month',
        usage_date
      ) = DATE_TRUNC(
        'month',
        CURRENT_DATE
      )
  `;

  const result =
    await pool.query(
      query,
      [tenantId]
    );

  return result.rows[0];
};