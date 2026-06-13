import dotenv from "dotenv";
import path from "path";

import {
  readJsonFile
}
from "../services/storageService.js";

dotenv.config();

const TENANT_FILE =
  path.resolve(
    "src/data/tenants.json"
  );

export let tenantConfigs =
  readJsonFile(
    TENANT_FILE
  );

export {
  TENANT_FILE
}

