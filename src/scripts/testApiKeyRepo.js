import {
  createApiKeyDb,
  getTenantByApiKeyDb
} from "../repositories/apiKeyRepository.js";

await createApiKeyDb(
  "ntf-test-key",
  "org_test"
);

console.log(
  await getTenantByApiKeyDb(
    "ntf-test-key"
  )
);

process.exit();