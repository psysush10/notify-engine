import { pool }
from "../config/db.js";

export const createInvoiceDb = async (invoice) => {

  const result =
    await pool.query(
      `
      INSERT INTO invoices (

        tenant_id,
        invoice_month,
        plan,
        usage_count,
        base_price,
        overage,
        total_amount,
        status

      )

      VALUES (

        $1,$2,$3,$4,$5,$6,$7,$8

      )

      RETURNING *
      `,
      [

        invoice.tenantId,
        invoice.invoiceMonth,
        invoice.plan,
        invoice.usageCount,
        invoice.basePrice,
        invoice.overage,
        invoice.totalAmount,
        invoice.status

      ]
    );

  return result.rows[0];

};

export const getInvoicesByTenantDb = async (tenantId) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM invoices
      WHERE tenant_id = $1
      ORDER BY created_at DESC
      `,
      [tenantId]
    );

  return result.rows;

};

export const updateInvoiceStatusDb = async (
  invoiceId,
  status
) => {

  const result =
    await pool.query(
      `
      UPDATE invoices
      SET status = $2
      WHERE id = $1
      RETURNING *
      `,
      [
        invoiceId,
        status
      ]
    );

  return result.rows[0];

};