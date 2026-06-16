import {
  getSubscription
}
  from "../services/subscriptionService.js";

import {
  getMonthlyUsage
}
  from "../services/usageService.js";

import {
  getBillingAccount
}
  from "../services/billingAccountService.js";

import {
  getTenantProducts
}
  from "../services/tenantProductService.js";

import {
  getInvoices
}
  from "../services/invoiceService.js";

import {
  PLAN_LIMITS
} from "../constants/plans.js"

export const customerDashboard =
  async (
    req,
    res
  ) => {

    try {

      // const tenantId =
      //   req.tenantId;

      const tenantId =
        "org_1781386423048";

      const subscription =
        await getSubscription(
          tenantId
        );

      const usage =
        await getMonthlyUsage(
          tenantId
        );

      const billing =
        await getBillingAccount(
          tenantId
        );

      const products =
        await getTenantProducts(
          tenantId
        );

      const invoices =
        await getInvoices(
          tenantId
        );

      const latestInvoice = invoices.length > 0 ? invoices[invoices.length - 1] : null;

      const paidInvoices =
        invoices.filter(
          invoice =>
            invoice.status === "PAID"
        ).length;

      const openInvoices =
        invoices.filter(
          invoice =>
            invoice.status === "OPEN"
        ).length;

      const usageValue =
        Number(
          usage.total_usage || 0
        );

      const limit =
        PLAN_LIMITS[
        subscription.plan
        ];

      const usagePercent =
          Math.round(
            usageValue / limit * 100
          );

      const productCount =
        products.length;

      const revenueAmount =
        latestInvoice?.total_amount || 0;

      const excessUsage =
        Math.max(
          usageValue - limit,
          0
        );

      const currentOverage =
        excessUsage * 0.1;

      res.send(`

      <html>

      <head>

        <title>
          Customer Portal
        </title>

        <style>
          body {
            font-family: Arial;
            margin:40px auto;
            background:#eef2f7;
            max-width: 1600px;
            padding: 0 20px;
          }

          h1 {
            margin-bottom: 5px;
          }

          .card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);

}

          .badge {
            background: #2563eb;
            color: white;
            padding: 8px 14px;
            border-radius: 20px;
            font-weight: bold;
          }

          .metrics {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .metric-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            min-width: 220px;
            box-shadow:
            0 2px 8px rgba(0,0,0,0.08);
          }

          .metric-title {
            color: #666;
            font-size: 14px;
          }

          .metric-value {
            font-size: 28px;
            font-weight: bold;
            margin-top: 10px;
          }

          .warning {
            color: #dc2626;
            font-weight: bold;
          }

          .success {
            color: #16a34a;
            font-weight: bold;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            background: #f3f4f6;
          }

          th,
          td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }

          h1 {

  font-size: 48px;

  margin-bottom: 10px;

}

h2 {

  font-size: 32px;

}
        </style>

      </head>

      <body>

        <h1>
 🚀 ${billing.company_name}
 Customer Portal
</h1>

<p>
 Billing Contact:
 ${billing.billing_email}
</p>

<p>

<a href="/admin/dashboard">
🔧 Admin Dashboard
</a>

</p>

        <hr/>

        <div class="metrics">

  <div class="metric-card">
    <div class="metric-title">
      Current Plan
    </div>

    <div class="metric-value">
      ${subscription.plan}
    </div>
  </div>

  <div class="metric-card">
    <div class="metric-title">
      Monthly Usage
    </div>

    <div class="metric-value">
      ${usageValue}
    </div>
  </div>

  <div class="metric-card">
    <div class="metric-title">
      Products
    </div>

    <div class="metric-value">
      ${productCount}
    </div>
  </div>

  <div class="metric-card">
    <div class="metric-title">
      Latest Invoice
    </div>

    <div class="metric-value">
      ₹${revenueAmount}
    </div>
  </div>

</div>

<div class="card">

  <h2>
    Usage
  </h2>

  <p>
    Monthly Usage:
    ${usageValue}
    /
    ${limit}
  </p>

  <p>
    Current Overage Billing:
    ₹${currentOverage}
  </p>

  <p>
    Usage:
    ${usagePercent}%
  </p>

  ${
    usagePercent > 100
    ? `
      <p class="warning">
      ⚠ Overage Billing Active
      </p>
    `
    : `
      <p class="success">
      ✓ Within Plan Limits
      </p>
    `
  }

</div>

        <div class="card">

          <h2>
            Products
          </h2>

          <table>

<tr>
 <th>Product</th>
 <th>Status</th>
</tr>

${products.map(product => `

<tr>

<td>
${product.product_code}
</td>

<td>
Enabled
</td>

</tr>

`).join("")}

</table>

        </div>

        <div class="card">

          <h2>
            Billing
          </h2>

          <p>
            Company:
            ${billing.company_name}
          </p>

          <p>
            Email:
            ${billing.billing_email}
          </p>

        </div>

        <div class="card">

          <h2>
            Invoices
          </h2>

          <table>

<tr>
  <th>ID</th>
  <th>Month</th>
  <th>Amount</th>
  <th>Status</th>
</tr>

${invoices.map(invoice => `

<tr>

<td>
${invoice.id}
</td>

<td>
${invoice.invoice_month}
</td>

<td>
₹${invoice.total_amount}
</td>

<td>
${invoice.status}
</td>

</tr>

`).join("")}

</table>

        </div>

      </body>

      </html>

    `);

    } catch (error) {

      res.status(500).send(
        error.message
      );

    }

  };