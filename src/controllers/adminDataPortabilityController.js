export const adminDataPortabilityDashboard =
async (
  req,
  res
) => {

  res.send(`

<html>

<head>

<title>
Data Portability Center
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

.ready{
  color:#16a34a;
  font-weight:bold;
}

.future{
  color:#2563eb;
  font-weight:bold;
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
📦 Data Portability Center
</h1>


<p>

Reusable platform capability
for importing and exporting
tenant data.

</p>

<div class="metrics">

<div class="metric-card">
<div>
Import Formats
</div>
<div class="metric-value">
2
</div>
</div>

<div class="metric-card">
<div>
Export Formats
</div>
<div class="metric-value">
3
</div>
</div>

<div class="metric-card">
<div>
Platform Reusable
</div>
<div class="metric-value">
✓
</div>
</div>

</div>

<div class="card">

<h2>
Import Capabilities
</h2>

<p class="ready">
✓ CSV Import
</p>

<p class="ready">
✓ Excel Import
</p>

<p class="ready">
✓ Validation Layer
</p>

<p class="ready">
✓ Import Job Tracking
</p>

</div>

<div class="card">

<h2>
Export Capabilities
</h2>

<p class="ready">
✓ CSV Export
</p>

<p class="ready">
✓ Excel Export
</p>

<p class="ready">
✓ JSON Export
</p>

</div>

<div class="card">

<h2>
Data Ownership Principles
</h2>

<p>
✓ Tenant owns its data
</p>

<p>
✓ Import supported
</p>

<p>
✓ Export supported
</p>

<p>
✓ Auditability supported
</p>

</div>

<div class="card">

<h2>
Future Connectivity
</h2>

<p class="future">
→ API Connectors
</p>

<p class="future">
→ Scheduled Sync Jobs
</p>

<p class="future">
→ Database Connectors
</p>

<p class="future">
→ External SaaS Integrations
</p>

</div>

</body>

</html>

`);

};