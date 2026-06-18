import {
  runHealthTests
}
from "./testHealth.js";

import {
  runRepositoryTests
}
from "./testRepositories.js";

import { startTestServer, stopTestServer } from "./testSetup.js";

const run = async () => {

  await startTestServer();

  console.log(
    "\n=== RUNNING TESTS ===\n"
  );

  await runHealthTests();

  await runRepositoryTests();

  console.log(
    "\n=== ALL TESTS COMPLETED ===\n"
  );

  await stopTestServer();

};

run();