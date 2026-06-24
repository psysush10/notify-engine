import { getAllTenantsService } from "../services/adminTenantService.js";

export const adminTenants =
async (
  req,
  res
) => {

  try {

    const tenants =
      await getAllTenantsService();

    res.send(`

<html>

<head>

<title>
Tenant Management
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
  box-shadow:
    0 2px 8px rgba(
      0,
      0,
      0,
      0.08
    );
}

table{
  width:100%;
  border-collapse:collapse;
}

th{
  background:#f3f4f6;
}

th,
td{
  border:1px solid #ddd;
  padding:12px;
  text-align:left;
}

.status{
  color:#16a34a;
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
🏢 Tenant Management
</h1>

<div class="card">

<table>

<tr>

<th>
Tenant ID
</th>

<th>
Tenant Name
</th>

</tr>

${tenants.map(
tenant => `

<tr>

<td>

<a href="/admin/tenant/${tenant.tenant_id}">

${tenant.tenant_id}

</a>

</td>

<td>
${tenant.tenant_name}
</td>

</tr>

`
).join("")}

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