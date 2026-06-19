import {
  tenantRepository,
  eventRepository,
  auditRepository
}
from "../factories/respositoryFactory.js";

export const runRepositoryTests =
async () => {

  console.log(
    "Running Repository Tests..."
  );

  if (!tenantRepository) {

    throw new Error(
      "Tenant Repository Missing"
    );

  }

  console.log(
    "PASS Tenant Repository Loaded"
  );

  if (!eventRepository) {

    throw new Error(
      "Event Repository Missing"
    );

  }

  console.log(
    "PASS Event Repository Loaded"
  );

  if(!auditRepository){
    throw new Error(
      "Audit Repository missing"
    );

  }

  console.log(
    "PASS Audit Repository Loaded"
  );

};