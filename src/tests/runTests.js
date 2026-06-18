import {
  runHealthTests
}
from "./testHealth.js";

import {
  runRepositoryTests
}
from "./testRepositories.js";

const run = async () => {

  console.log(
    "\n=== RUNNING TESTS ===\n"
  );

  await runHealthTests();

  await runRepositoryTests();

  console.log(
    "\n=== ALL TESTS COMPLETED ===\n"
  );

};

run();