import app from "./server.js";

import { validateEnvironment }
from "./config/env.js";

import "./platform/sqlite/initSqlite.js";

import {
  startEventWorker
}
from "./workers/eventWorker.js";

validateEnvironment();

console.log(
  "Environment validation passed"
);

const PORT =
  process.env.PORT || 3001;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

    startEventWorker();

  }
);