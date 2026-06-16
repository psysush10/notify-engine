import { pool }
from "../config/db.js";

export const getAdminOverviewDb =
async () => {

  const tenants =
    await pool.query(
      `
      SELECT COUNT(*)
      FROM tenants
      `
    );

  const products =
    await pool.query(
      `
      SELECT COUNT(*)
      FROM api_products
      WHERE active = true
      `
    );

  const subscriptions =
    await pool.query(
      `
      SELECT COUNT(*)
      FROM subscriptions
      WHERE status = 'ACTIVE'
      `
    );

  const usage =
    await pool.query(
      `
      SELECT
        COALESCE(
        SUM(events_processed),
        0
    ) AS total_usage
    FROM tenant_usage
    WHERE DATE_TRUNC(
    'month',
    usage_date
    ) = DATE_TRUNC(
    'month',
    CURRENT_DATE
    )`
    );

  return {

    tenants:
      Number(
        tenants.rows[0].count
      ),

    products:
      Number(
        products.rows[0].count
      ),

    activeSubscriptions:
      Number(
        subscriptions.rows[0].count
      ),

    monthlyUsage:
      Number(
        usage.rows[0].total_usage
      )

  };

};

export const getRevenueAnalyticsDb =
async () => {

  const openInvoices =
    await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM invoices
      WHERE status='OPEN'
      `
    );

  const paidInvoices =
    await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM invoices
      WHERE status='PAID'
      `
    );

  const revenueCollected =
    await pool.query(
      `
      SELECT
      COALESCE(
        SUM(total_amount),
        0
      ) AS total
      FROM invoices
      WHERE status='PAID'
      `
    );

  const revenuePending =
    await pool.query(
      `
      SELECT
      COALESCE(
        SUM(total_amount),
        0
      ) AS total
      FROM invoices
      WHERE status='OPEN'
      `
    );

  return {

    openInvoices:
      Number(
        openInvoices.rows[0].count
      ),

    paidInvoices:
      Number(
        paidInvoices.rows[0].count
      ),

    revenueCollected:
      Number(
        revenueCollected.rows[0].total
      ),

    revenuePending:
      Number(
        revenuePending.rows[0].total
      )

  };

};