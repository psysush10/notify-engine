import { pool }
  from "../config/db.js";

export const createAuditLogDb = async ({
    requestId,
    tenantId,
    status,
    message
  }) => {

    const query = `
      INSERT INTO event_audit (

        request_id,
        tenant_id,
        status,
        message

      )
      VALUES (
        $1,$2,$3,$4
      )
    `;

    await pool.query(
      query,
      [
        requestId,
        tenantId,
        status,
        message
      ]
    );
  };

export const getAuditTimelineDb = async (
    requestId,
    tenantId
  ) => {

    const query = `
      SELECT
        status,
        message,
        created_at

      FROM event_audit

      WHERE
        request_id = $1
        AND tenant_id = $2

      ORDER BY
        created_at ASC
    `;

    const result =
      await pool.query(
        query,
        [
          requestId,
          tenantId
        ]
      );

    return result.rows;
  };