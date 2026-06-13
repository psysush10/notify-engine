import path from "path";

import {
  readJsonFile
}
from "../services/storageService.js";

const API_KEY_FILE =
  path.resolve(
    "src/data/apiKeys.json"
  );

export let apiKeys =
  readJsonFile(
    API_KEY_FILE
  );

export {
  API_KEY_FILE
}