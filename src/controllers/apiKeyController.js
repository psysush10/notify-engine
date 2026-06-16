import {

  rotateApiKey

}
from "../services/apiKeyService.js";
import { createAuditLog } from "../services/auditService.js";
export const rotateApiKeyAdmin =
async (
  req,
  res
) => {

  try {

    const tenantId =
      req.params.tenantId;

    const apiKey = await rotateApiKey(
      tenantId
    );

    await createAuditLog(

      tenantId,

      "API_KEY_ROTATED",

      {}

    );

    console.log(
    "NEW API KEY:",
    apiKey
  );

    res.send(`

      <html>

      <head>

        <title>
          API Key Rotated
        </title>

        <style>

          body {

            font-family:
              Arial;

            margin:
              40px;

          }

          .card {

            border:
              1px solid #ddd;

            padding:
              20px;

            border-radius:
              8px;

            max-width:
              800px;

          }

          pre {

            background:
              #f4f4f4;

            padding:
              15px;

            border-radius:
              4px;

            overflow:
              auto;

          }

        </style>

      </head>

      <body>

        <div class="card">

          <h2>
            API Key Rotated
          </h2>

          <p>

            Copy this API key now.

            It will never be shown again.

          </p>

          <pre>
${apiKey}
          </pre>

          <br/>

          <a href="/admin/tenant/${tenantId}">
            Back to Tenant
          </a>

        </div>

      </body>

      </html>

    `);

  } catch(error){

    res.status(500)
      .send(error.message);

  }

};