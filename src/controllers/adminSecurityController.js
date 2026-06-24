import {
  getAllTenantsService
}
from "../services/adminTenantService.js";

import {
  getUsers
}
from "../services/userService.js";

export const adminSecurityDashboard =
async (
  req,
  res
) => {

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
Security Dashboard
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
🔐 Security Dashboard
</h1>

<div class="metrics">

<div class="metric-card">
<div>JWT</div>
<div class="metric-value">
✓
</div>
</div>

<div class="metric-card">
<div>Tenant Users</div>
<div class="metric-value">
${totalUsers}
</div>
</div>

<div class="metric-card">
<div>RBAC Roles</div>
<div class="metric-value">
3
</div>
</div>

</div>

<div class="card">

<h2>
Authentication
</h2>

<p>
✓ Password Hashing
</p>

<p>
✓ JWT Authentication
</p>

<p>
✓ Token Expiration
</p>

</div>

<div class="card">

<h2>
Authorization
</h2>

<p>
✓ TENANT_ADMIN
</p>

<p>
✓ TENANT_OPERATOR
</p>

<p>
✓ VIEWER
</p>

</div>

<div class="card">

<h2>
Audit Coverage
</h2>

<p>
✓ LOGIN_SUCCESS
</p>

<p>
✓ LOGIN_FAILED
</p>

<p>
✓ PASSWORD_UPDATED
</p>

<p>
✓ PRODUCT_ENABLED
</p>

<p>
✓ PRODUCT_DISABLED
</p>

</div>

</body>

</html>

`);

};