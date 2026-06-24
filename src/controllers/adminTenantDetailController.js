import {
  getTenantById
}
from "../services/tenantService.js";

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

import { getUsers } from "../services/userService.js";

import {
  PLAN_LIMITS
}
from "../constants/plans.js";

import {
  getApiKey,
  rotateApiKey
} from "../services/apiKeyService.js";

import {
  billingConfig
} from "../config/index.js"

export const adminTenantDetail =
async (
  req,
  res
) => {

  try {

    const tenantId =
      req.params.tenantId;

    const tenant =
      await getTenantById(
        tenantId
      );

    const apiKey = await getApiKey(tenantId);

    const subscription =
      await getSubscription(
        tenantId
      ) || {

        plan:
          billingConfig.plans[0]

      };

    const usage =
      await getMonthlyUsage(
        tenantId
      ) || { total_usage:0};

    const billing =
      await getBillingAccount(
        tenantId
      ) || {company_name:tenant.tenant_name,billing_email:"Not Configured"};

    const products =
      await getTenantProducts(
        tenantId
      ) || [];

    const users = await getUsers(tenantId) || [];
    console.log(users);

    const invoices =
      await getInvoices(
        tenantId
      ) || [];

    const usageValue =
      Number(
        usage.total_usage || 0
      );

    const limit =
      PLAN_LIMITS[
        subscription.plan
      ] || 100;

    const usagePercent = limit > 0?
      Math.round(
        usageValue / limit * 100
      ) : 0;

      console.log("tentant",tenantId);
      console.log("api",apiKey);

    res.send(`

<html>

<head>

<title>
Tenant Detail
</title>

<style>

body{
  font-family:Arial,sans-serif;
  background:#eef2f7;
  margin:40px;
}

.card{
  background:white;
  border-radius:10px;
  padding:24px;
  margin-bottom:20px;
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
  font-size:30px;
  font-weight:bold;
  margin-top:10px;
}

table{
  width:100%;
  border-collapse:collapse;
}

th,
td{
  border:1px solid #ddd;
  padding:10px;
}

th{
  background:#f3f4f6;
}

select {

  padding: 8px;

  margin-right: 10px;

}

button {

  background: #2563eb;

  color: white;

  border: none;

  padding: 8px 14px;

  border-radius: 6px;

  cursor: pointer;

}

</style>

</head>

<body>

<div style="
background:white;
padding:15px;
margin-bottom:20px;
border-radius:10px;
box-shadow:0 2px 8px rgba(0,0,0,0.08);
">

<a href="/admin/dashboard">
🏠 Dashboard
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/health">
🏥 Health
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/security">
🔐 Security
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/architecture">
🏗 Architecture
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/platform-logs">
📊 Activity Center
</a>

<a href="/admin/data">
📦 Data Portability
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/tenants">
🏢 Tenants
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/logout">
🚪 Logout
</a>

</div>

<h1>
🏢 ${tenant.tenant_name}
</h1>

<div class="metrics">

<div class="metric-card">
<div class="metric-title">
Plan
</div>
<div class="metric-value">
${subscription.plan}
</div>
</div>

<div class="metric-card">
<div class="metric-title">
Usage
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
${products.length}
</div>
</div>

</div>

<div class="card">

<h2>
Usage Details
</h2>

<p>

${usageValue}
/
${limit}

</p>

<p>

${usagePercent}% Used

</p>

</div>

<div class="card">

<h2>
Billing
</h2>

<p>
${billing?.company_name || "-"}
</p>

${billing.billing_email === "Not Configured"
? `
<p style="color:#dc2626">
⚠ Billing Not Configured
</p>
`
: ""
}

</div>

<div class="card">

<h2>
API Access
</h2>

<p>

API key is securely stored
and cannot be viewed.

</p>

<p>

Rotate API key to generate
a new credential.

</p>

<br/><br/>



<form

  method="POST"

  action="/admin/tenant/${tenantId}/apikey/rotate"

>



<button type="submit">



Rotate API Key



</button>



</form>



</div>

<div class="card">

<h2>
Products
</h2>

<table>

<tr>
<th>Product</th>
<th>Status</th>
<th>Action</th>
</tr>

${products.map(product => `

<tr>

<td>
${product.product_code}
</td>

<td>

${product.enabled
  ? "🟢 Enabled"
  : "🔴 Disabled"}

</td>

<td>

<form
  action="/admin/tenant/${tenantId}/product"
  method="POST"
>

<input
  type="hidden"
  name="productCode"
  value="${product.product_code}"
>

<input
  type="hidden"
  name="enabled"
  value="${!product.enabled}"
>

<button
  type="submit"
>

${product.enabled
  ? "Disable"
  : "Enable"}

</button>

</form>

</td>

</tr>

`).join("")}

</table>

</div>
<div class="card">

<h2>
⚙ Plan Management
</h2>

<p>

Current Plan:

<strong>
${subscription.plan}
</strong>

<p>

Plan Benefits:

${subscription.plan === "FREE"
? "100 events/month"
: subscription.plan === "PRO"
? "1000 events/month"
: "10000 events/month"}

</p>

</p>

<p>

Usage Limit:

<strong>
${limit}
</strong>

events/month

</p>

<form
  action="/admin/tenant/${tenantId}/plan"
  method="POST"
>

<select
  name="plan"
>

${billingConfig.plans.map(plan => `

<option

value="${plan}"

${subscription.plan === plan
  ? "selected"
  : ""
}

>

${plan}

</option>

`).join("")}

</select>

<button
  type="submit"
>
Update Plan
</button>

</form>

</div>

<div class="card">

<h2>
Invoices
</h2>

<table>

<tr>
<th>Month</th>
<th>Amount</th>
<th>Status</th>
</tr>

${invoices.map(invoice => `

<tr>

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

<div class="card">

<h2>
👥 Tenant Users
</h2>

<table>

<tr>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Last Login</th>

</tr>

${users.map(user => `

<tr>

<td>
${user.email}
</td>

<td>
${user.role}
</td>

<td>

${user.status === "ACTIVE"

? "🟢 ACTIVE"

: "🔴 INACTIVE"}

</td>

<td>

${user.last_login_at
? new Date(
    user.last_login_at
  ).toLocaleString()
: "-"}

</td>

</tr>

`).join("")}

</table>

</div>

</body>

</html>

`);

  } catch(error){

    res.status(500)
      .send(error.message);

  }

};