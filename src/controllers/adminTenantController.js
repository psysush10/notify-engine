import {
  getAllTenantsDb
}
from "../repositories/tenantRepository.js";

export const adminTenants =
async (
  req,
  res
) => {

  try {

    const tenants =
      await getAllTenantsDb();

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

<h1>
🏢 Tenant Management
</h1>

<p>

<a href="/admin/dashboard">

← Admin Dashboard

</a>

</p>

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