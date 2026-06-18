const BASE_URL =
  "http://localhost:3001";

export const runHealthTests =
async () => {

  console.log(
    "Running Health Tests..."
  );

  const endpoints = [

    "/health",
    "/health/postgres",
    "/health/sqlite",
    "/health/worker"

  ];

  for (
    const endpoint
    of endpoints
  ) {

    const response =
      await fetch(
        `${BASE_URL}${endpoint}`
      );

    if (!response.ok) {
      const body = await response.text();

      console.log("FAILED RESPONSE", body);



      throw new Error(
         `Failed: ${endpoint}`
       );

    }

    console.log(
      `PASS ${endpoint}`
    );

  }

};