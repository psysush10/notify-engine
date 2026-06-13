import {
  createTenantConfigDb,
  getTenantConfigDb,
  updateTenantConfigDb
}
from "../repositories/tenantConfigRepository.js";

await createTenantConfigDb(
  "org_demo"
);

console.log(
  await getTenantConfigDb(
    "org_demo"
  )
);

await updateTenantConfigDb(
  "org_demo",
  {
    slackEnabled: false,
    slackWebhook:
      "https://hooks.slack.com/test"
  }
);

console.log(
  await getTenantConfigDb(
    "org_demo"
  )
);

process.exit();