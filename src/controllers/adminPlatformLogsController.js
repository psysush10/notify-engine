import {
  getRecentLogs
}
from "../platform/sqlite/logRepository.js";

export const adminPlatformLogs =
async (
  req,
  res
) => {

  const getCategory = (
  message
) => {

  if (
  message?.includes("LOGIN") ||
  message?.includes("PASSWORD") ||
  message?.includes("API_KEY") ||
  message?.includes("ADMIN_LOGIN") ||
  message?.includes("ADMIN_LOGOUT")
  ) {
    return "SECURITY";
  }

  if (
    message?.includes("TENANT") ||
    message?.includes("PLAN")
  ) {
    return "TENANT";
  }

  if (
    message?.includes("BILLING") ||
    message?.includes("INVOICE")
  ) {
    return "BILLING";
  }

  return "SYSTEM";

};

  try {

    const logs =
      await getRecentLogs();

    const totalActivities =
      logs.length;

    const securityEvents =
      logs.filter(
        log =>
          getCategory(
            log.message
          ) === "SECURITY"
      ).length;

    const tenantEvents =
      logs.filter(
        log =>
          getCategory(
            log.message
          ) === "TENANT"
      ).length;

    const systemEvents =
      logs.filter(
        log =>
          getCategory(
            log.message
          ) === "SYSTEM"
      ).length;

    res.send(`

<html>

<head>

<title>
Platform Logs
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
📋 Activity Center
</h1>

<p style="color:#666">
Operational telemetry powered by SQLite

<div class="metrics">

<div class="metric-card">

<div class="metric-title">
Total Activities
</div>

<div class="metric-value">
${totalActivities}
</div>

</div>

<div class="metric-card">

<div class="metric-title">
Security Events
</div>

<div class="metric-value">
${securityEvents}
</div>

</div>

<div class="metric-card">

<div class="metric-title">
Tenant Events
</div>

<div class="metric-value">
${tenantEvents}
</div>

</div>

<div class="metric-card">

<div class="metric-title">
System Events
</div>

<div class="metric-value">
${systemEvents}
</div>

</div>

</div>

<div class="card">

<table>

<tr>

<th>
Timestamp
</th>

<th>
Category
</th>

<th>
Level
</th>

<th>
Message
</th>

<th>
Metadata
</th>


</tr>

${logs.map(log => `

<tr>

<td>
${log.timestamp}
</td>

<td>

<span
class="badge ${getCategory(
  log.message
).toLowerCase()}"
>

${getCategory(
  log.message
)}

</span>

</td>


<td>
${log.level}
</td>

<td>
${log.message}
</td>

<td>
${log.metadata}
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