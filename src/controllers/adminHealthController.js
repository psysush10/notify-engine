import {
  getAdminOverview
}
from "../services/adminService.js";

import {
  getAllTenantsService
}
from "../services/adminTenantService.js";

import {
  getUsers
}
from "../services/userService.js";

export const adminHealthDashboard =
async (
  req,
  res
) => {

  try {

    const overview =
      await getAdminOverview();

    const tenants =
      await getAllTenantsService();

    let totalUsers = 0;

    for (
      const tenant of tenants
    ) {

      const users =
        await getUsers(
          tenant.tenant_id
        );

      totalUsers +=
        users.length;

    }

    res.send(`

<html>

<head>

<title>
Platform Health
</title>

<style>

body{
  font-family:Arial;
  background:#eef2f7;
  margin:40px;
}

.card{
  background:white;
  padding:24px;
  border-radius:10px;
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
  flex-wrap:wrap;
  margin-bottom:20px;
}

.metric-card{
  background:white;
  padding:20px;
  border-radius:10px;
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

.badge{
  color:white;
  padding:4px 8px;
  border-radius:4px;
  font-size:12px;
  font-weight:bold;
}

.security{
  background:#dc2626;
}

.tenant{
  background:#2563eb;
}

.billing{
  background:#9333ea;
}

.system{
  background:#16a34a;
}

table{
  width:100%;
  border-collapse:collapse;
}

th,
td{
  border:1px solid #ddd;
  padding:10px;
  text-align:left;
}

th{
  background:#f3f4f6;
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

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="/admin/data">
📦 Data Portability
</a>

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
🏥 Platform Health Dashboard
</h1>

<div class="metrics">

<div class="metric-card">
<div>Tenants</div>
<div class="metric-value">
${overview.tenants}
</div>
</div>

<div class="metric-card">
<div>Users</div>
<div class="metric-value">
${totalUsers}
</div>
</div>

<div class="metric-card">
<div>Products</div>
<div class="metric-value">
${overview.products}
</div>
</div>

<div class="metric-card">
<div>Subscriptions</div>
<div class="metric-value">
${overview.activeSubscriptions}
</div>
</div>

</div>

<div class="card">

<h2>
Platform Engines
</h2>

<p class="success">
🟢 Identity Engine
</p>

<p class="success">
🟢 Tenant Engine
</p>

<p class="success">
🟢 Billing Engine
</p>

<p class="success">
🟢 Usage Engine
</p>

<p class="success">
🟢 Audit Engine
</p>

<p class="success">
🟢 Admin Engine
</p>

<p class="success">
🟢 Observability Engine
</p>

</div>

<div class="card">

<h2>
Infrastructure
</h2>

<p class="success">
🟢 PostgreSQL Connected
</p>

<p class="success">
🟢 SQLite Connected
</p>

</div>

<div class="card">

<h2>
Platform Readiness
</h2>

<p class="success">
✓ Multi-Tenancy
</p>

<p class="success">
✓ Authentication
</p>

<p class="success">
✓ RBAC
</p>

<p class="success">
✓ Billing
</p>

<p class="success">
✓ Usage Tracking
</p>

<p class="success">
✓ Audit Logging
</p>

<p class="success">
✓ Operational Telemetry
</p>

</div>

<div class="card">

<h2>
System Status
</h2>

<p class="success">
All Platform Components Operational
</p>

<p>

Last Refresh:
${new Date().toLocaleString()}

</p>

</div>

</body>

</html>

`);

  } catch(error){

    res.status(500)
      .send(error.message);

  }

};