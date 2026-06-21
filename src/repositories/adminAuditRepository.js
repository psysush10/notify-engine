import { pool }
from "../config/db.js";

export const createAdminAuditDb =
async (
  tenantId,
  action,
  details
) => {

  const result =
    await pool.query(

      `
      INSERT INTO admin_audit (

        tenant_id,
        action,
        details

      )

      VALUES (
        $1,
        $2,
        $3
      )

      RETURNING *
      `,

      [
        tenantId,
        action,
        details
      ]

    );

  return result.rows[0];

};

export const getAdminAuditDb =
async (
  tenantId
) => {

  const result =
    await pool.query(

      `
      SELECT *
      FROM admin_audit
      WHERE tenant_id = $1
      ORDER BY created_at DESC
      `,

      [tenantId]

    );

  return result.rows;

};