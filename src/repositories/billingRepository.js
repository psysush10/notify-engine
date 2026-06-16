import { pool }
from "../config/db.js";

export const getBillingAccountDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM billing_accounts
      WHERE tenant_id = $1
      `,
      [tenantId]
    );

  return result.rows[0];
};

export const upsertBillingAccountDb = async (
  tenantId,
  billingEmail,
  companyName
) => {

  const result =
    await pool.query(
      `
      INSERT INTO billing_accounts (

        tenant_id,
        billing_email,
        company_name,
        billing_status

      )

      VALUES (

        $1,
        $2,
        $3,
        'ACTIVE'

      )

      ON CONFLICT (tenant_id)

      DO UPDATE SET

        billing_email =
          EXCLUDED.billing_email,

        company_name =
          EXCLUDED.company_name

      RETURNING *
      `,
      [
        tenantId,
        billingEmail,
        companyName
      ]
    );

  return result.rows[0];
};