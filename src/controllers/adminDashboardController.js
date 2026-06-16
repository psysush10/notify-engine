import {
  getAdminOverview
}
from "../services/adminService.js";

import {
  getRevenueAnalytics
}
from "../services/adminService.js";

export const adminDashboard =
async (
  req,
  res
) => {

  try {

    const overview =
      await getAdminOverview();

    const revenue =
      await getRevenueAnalytics();

    const revenueCollected =
  revenue.revenueCollected;

const revenuePending =
  revenue.revenuePending;

const tenantCount =
  overview.tenants;

const usageCount =
  overview.monthlyUsage;

    res.send(`

      <html>

      <head>

        <title>
          Notify Engine Admin
        </title>
        <style>

            body{
            font-family: Arial;
            margin:40px auto;
            background:#eef2f7;
            max-width: 1600px;
            padding: 0 20px;
            }

            .card {

  background: white;

  border: 1px solid #ddd;

  border-radius: 10px;

  padding: 24px;

  margin-bottom: 24px;

  box-shadow:
    0 2px 8px rgba(
      0,
      0,
      0,
      0.08
    );

}

            .metrics{
  display:flex;
  gap:20px;
  margin-bottom:20px;
  flex-wrap:wrap;
}

.metric-card{
  background:white;
  border-radius:10px;
  padding:20px;
  min-width:220px;
  box-shadow:
    0 2px 8px rgba(
      0,
      0,
      0,
      0.08
    );
}

.metric-title{
  color:#666;
}

.metric-value{
  font-size:28px;
  font-weight:bold;
  margin-top:10px;
}

h1 {

  font-size: 48px;

  margin-bottom: 10px;

}

h2 {

  font-size: 32px;

}

.tenants {
  border-left: 5px solid #2563eb;
}

.usage {
  border-left: 5px solid #16a34a;
}

.revenue {
  border-left: 5px solid #9333ea;
}

.pending {
  border-left: 5px solid #dc2626;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background: #f3f4f6;
}

        </style>

      </head>

      <body>

        <h1>
          Notify Engine Admin
        </h1>
<p>
        <a href="/customer/dashboard">
👤 Switch to Customer View
</a>
</p>

<p>

<a href="/admin/tenants">

🏢 Manage Tenants

</a>

</p>
</hr>

        <div class="metrics">

  <div class="metric-card tenants">

    <div class="metric-title">
      Tenants
    </div>

    <div class="metric-value">
      ${tenantCount}
    </div>

  </div>

  <div class="metric-card usage">

    <div class="metric-title">
      Monthly Usage
    </div>

    <div class="metric-value">
      ${usageCount}
    </div>

  </div>

  <div class="metric-card revenue">

    <div class="metric-title">
      Revenue
    </div>

    <div class="metric-value">
      ₹${revenueCollected}
    </div>

    <div style="color:green">
↑ Active Revenue
</div>

  </div>

  <div class="metric-card pending">

    <div class="metric-title">
      Pending
    </div>

    <div class="metric-value">
      ₹${revenuePending}
    </div>

    <div style="color:green">
✓ No Outstanding Balance
</div>

  </div>

</div>

        <hr/>

        <div class="card">

        <h2>
          Platform Overview
        </h2>

        <div class="metrics">
        <div class="metric-card">
  <div class="metric-title">Tenants</div>
  <div class="metric-value">${overview.tenants}</div>
</div>
<div class="metric-card">
  <div class="metric-title">Products</div>
  <div class="metric-value">${overview.products}</div>
</div>
<div class="metric-card">
  <div class="metric-title">Subscriptions</div>
  <div class="metric-value">${overview.activeSubscriptions}</div>
</div>

<div class="metric-card">
  <div class="metric-title">Usage</div>
  <div class="metric-value">${overview.monthlyUsage}</div>
</div>
        </div>
        <hr/>

        <h3>
Platform Status
</h3>

<p style="color:green">
✓ All Systems Operational
</p>

<p>
Last Refresh:
${new Date().toLocaleString()}
</p>
</div>

        <div class="card">
        <h2>
          Revenue Analytics
        </h2>

        <table>

<tr>
  <th>Metric</th>
  <th>Value</th>
</tr>

<tr>
  <td>Revenue Collected</td>
  <td>₹${revenueCollected}</td>
</tr>

<tr>
  <td>Revenue Pending</td>
  <td>₹${revenuePending}</td>
</tr>

<tr>
  <td>Paid Invoices</td>
  <td>${revenue.paidInvoices}</td>
</tr>

<tr>
  <td>Open Invoices</td>
  <td>${revenue.openInvoices}</td>
</tr>

</table>
        </div>
<hr>

<p style="color:#666">

Notify Engine SaaS Platform

Version 1.0

</p>

      </body>

      </html>

    `);

  } catch (error) {

    res.status(500).send(
      error.message
    );

  }

};