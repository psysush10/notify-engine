export const adminArchitectureDashboard =
async (
  req,
  res
) => {

  res.send(`

<html>

<head>

<title>
Architecture Dashboard
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
🏗 Architecture Dashboard
</h1>

<div class="metrics">

<div class="metric-card">
<div>Controllers</div>
<div class="metric-value">15+</div>
</div>

<div class="metric-card">
<div>Services</div>
<div class="metric-value">20+</div>
</div>

<div class="metric-card">
<div>Repositories</div>
<div class="metric-value">10+</div>
</div>

<div class="metric-card">
<div>Middleware</div>
<div class="metric-value">8+</div>
</div>

<div class="metric-card">
<div>Contracts</div>
<div class="metric-value">10+</div>
</div>

</div>

<div class="card">

<h2>
Layered Architecture
</h2>

<p>✓ API Layer</p>
<p>✓ Controller Layer</p>
<p>✓ Service Layer</p>
<p>✓ Repository Layer</p>
<p>✓ PostgreSQL Persistence Layer</p>

</div>

<div class="card">

<h2>
Security Architecture
</h2>

<p>✓ JWT Authentication</p>
<p>✓ RBAC Authorization</p>
<p>✓ Password Hashing</p>
<p>✓ API Key Authentication</p>
<p>✓ Session Based Admin Access</p>

</div>

<div class="card">

<h2>
Operational Architecture
</h2>

<p>✓ Audit Logging</p>
<p>✓ Usage Tracking</p>
<p>✓ Billing Management</p>
<p>✓ Subscription Management</p>
<p>✓ Invoice Management</p>

</div>

<div class="card">

<h2>
Platform Capabilities
</h2>

<p>✓ Multi Tenant SaaS</p>
<p>✓ Product Entitlements</p>
<p>✓ API Key Rotation</p>
<p>✓ User Management</p>
<p>✓ Security Dashboard</p>
<p>✓ Admin Portal</p>

</div>

<div class="card">

<h2>
🎯 Architectural Principles
</h2>

<p>
✓ Separation of Concerns
</p>

<p>
✓ Repository Pattern
</p>

<p>
✓ Dependency Abstraction
</p>

<p>
✓ Multi-Tenant Isolation
</p>

<p>
✓ Security First Design
</p>

</div>

</body>

</html>

`);

};