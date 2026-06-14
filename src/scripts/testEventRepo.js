import {
 createEventDb,
 getEventsDb
}
from "../repositories/eventRepository.js";

await createEventDb({
 requestId:
  "req_test_1",

 tenantId:
  "org_test",

 type:
  "risk_detected",

 project:
  "Demo",

 severity:
  "high",

 status:
  "SUCCESS",

 retryCount:
  0
});

console.log(
 await getEventsDb()
);

process.exit();