import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Notify Engine API",
      version: "1.0.0",
      description:
        "Multi-Tenant Event Processing & Notification Platform"
    },

    servers: [
      {
        url: "http://localhost:3001",
        description: "Local Development"
      }
    ],

    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description:
            "Use: Bearer ntf-org1-demo-key"
        }
      }
    },

    security: [
      {
        ApiKeyAuth: []
      }
    ],

    paths: {
      "/event": {
        post: {
          tags: ["Event Processing"],
          summary: "Process Event",
          description:
            "Processes an event and triggers configured integrations",

          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  type: "risk_detected",
                  project: "Client Alpha",
                  severity: "high",
                  email: "demo@example.com"
                }
              }
            }
          },

          responses: {
            200: {
              description: "Event Processed Successfully"
            },
            500: {
              description: "Event Processing Failed"
            }
          }
        }
      },

      "/event-status/{requestId}": {
        get: {
          tags: ["Event Processing"],
          summary: "Get Event Status",

          parameters: [
            {
              name: "requestId",
              in: "path",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],

          responses: {
            200: {
              description: "Status Retrieved"
            }
          }
        }
      },

      "/tenant": {
        get: {
          tags: ["Tenant Management"],
          summary: "List Tenants",

          responses: {
            200: {
              description: "Tenant List"
            }
          }
        }
      },

      "/tenant/config": {
        get: {
          tags: ["Tenant Management"],
          summary: "Get Tenant Configuration",

          responses: {
            200: {
              description: "Tenant Configuration"
            }
          }
        },

        put: {
          tags: ["Tenant Management"],
          summary: "Update Tenant Configuration",

          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  slackEnabled: false,
                  emailEnabled: true,
                  webhookEnabled: true
                }
              }
            }
          },

          responses: {
            200: {
              description: "Configuration Updated"
            }
          }
        }
      },

      "/history": {
        get: {
          tags: ["Observability"],
          summary: "Get All Event History",

          responses: {
            200: {
              description: "History Retrieved"
            }
          }
        }
      },

      "/history/{tenantId}": {
        get: {
          tags: ["Observability"],
          summary: "Get Tenant History",

          parameters: [
            {
              name: "tenantId",
              in: "path",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],

          responses: {
            200: {
              description: "Tenant History Retrieved"
            }
          }
        }
      },

      "/metrics": {
        get: {
          tags: ["Platform Analytics"],
          summary: "Platform Metrics",

          responses: {
            200: {
              description: "Metrics Retrieved"
            }
          }
        }
      },

      "/metrics/{tenantId}": {
        get: {
          tags: ["Platform Analytics"],
          summary: "Tenant Metrics",

          parameters: [
            {
              name: "tenantId",
              in: "path",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],

          responses: {
            200: {
              description: "Tenant Metrics Retrieved"
            }
          }
        }
      },

      "/dashboard": {
        get: {
          tags: ["Platform Analytics"],
          summary: "Dashboard Overview",

          responses: {
            200: {
              description: "Dashboard Statistics"
            }
          }
        }
      },

      "/health": {
        get: {
          tags: ["Observability"],
          summary: "Health Check",

          responses: {
            200: {
              description: "Service Healthy"
            }
          }
        }
      }
    }
  },

  apis: []
};

export const swaggerSpec = swaggerJSDoc(options);