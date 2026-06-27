import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Notify Engine API",
      version: "2.0.0",
      description:
        "Enterprise Multi-Tenant Event Processing Platform featuring authentication, tenant isolation, asynchronous processing, observability, replay, SaaS billing foundations, usage tracking, RBAC and bulk CSV import."
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
  "/tenant": {
    get: {
      tags: ["Multi-Tenant Platform"],
      summary: "List Tenants"
    },
    post: {
      tags: ["Multi-Tenant Platform"],
      summary: "Create Tenant"
    }
  },

  "/tenant/config": {
    get: {
      tags: ["Multi-Tenant Platform"],
      summary: "Get Tenant Configuration"
    },
    put: {
      tags: ["Multi-Tenant Platform"],
      summary: "Update Tenant Configuration"
    }
  },

  "/tenant/integrations": {
    get: {
      tags: ["Multi-Tenant Platform"],
      summary: "Get Tenant Integrations"
    },
    put: {
      tags: ["Multi-Tenant Platform"],
      summary: "Update Tenant Integrations"
    }
  },

  "/tenant/plan": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Tenant Plan"
    }
  },

  "/tenant/usage": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Current Usage"
    }
  },

  "/tenant/usage/monthly": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Monthly Usage"
    }
  },

  "/tenant/subscription": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Subscription Details"
    },
    put: {
      tags: ["SaaS Platform"],
      summary: "Update Subscription"
    }
  },

  "/tenant/billing": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Billing Information"
    },
    put: {
      tags: ["SaaS Platform"],
      summary: "Update Billing"
    }
  },

  "/tenant/billing/invoice-preview": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Invoice Preview"
    }
  },

  "/tenant/products": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Available Products"
    },
    post: {
      tags: ["SaaS Platform"],
      summary: "Create Product"
    }
  },

  "/tenant/invoice/generate": {
    post: {
      tags: ["SaaS Platform"],
      summary: "Generate Invoice"
    }
  },

  "/tenant/invoices": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Invoice History"
    }
  },

  "/tenant/invoices/{id}/pay": {
    get: {
      tags: ["SaaS Platform"],
      summary: "Pay Invoice",
      parameters: [{
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        }
      }]
    }
  },

  "/auth/setup-password": {
    post: {
      tags: ["Security"],
      summary: "Setup Password"
    }
  },

  "/auth/login": {
    get: {
      tags: ["Security"],
      summary: "Login"
    }
  },

  "/jwt/me": {
    get: {
      tags: ["Security"],
      summary: "Current JWT User"
    }
  },

  "/account/me": {
    get: {
      tags: ["Security"],
      summary: "Current Account"
    }
  },

  "/users": {
    get: {
      tags: ["Security"],
      summary: "List Users"
    }
  },

  "/event": {
    post: {
      tags: ["Event Platform"],
      summary: "Submit Event"
    }
  },

  "/event-status/{requestId}": {
    get: {
      tags: ["Event Platform"],
      summary: "Event Status",
      parameters: [{
        name: "requestId",
        in: "path",
        required: true,
        schema: {
          type: "string"
        }
      }]
    }
  },

  "/event/replay": {
    post: {
      tags: ["Event Platform"],
      summary: "Replay Event"
    }
  },

  "/event/timeline": {
    get: {
      tags: ["Event Platform"],
      summary: "Event Timeline"
    }
  },

  "/history": {
    get: {
      tags: ["Operations & Observability"],
      summary: "Event History"
    }
  },

  "/history/{tenantId}": {
    get: {
      tags: ["Operations & Observability"],
      summary: "Tenant History",
      parameters: [{
        name: "tenantId",
        in: "path",
        required: true,
        schema: {
          type: "string"
        }
      }]
    }
  },

  "/health": {
    get: {
      tags: ["Operations & Observability"],
      summary: "Health Check"
    }
  },

  "/status/environment": {
    get: {
      tags: ["Operations & Observability"],
      summary: "Environment Status"
    }
  },

  "/metrics": {
    get: {
      tags: ["Platform Intelligence"],
      summary: "Platform Metrics"
    }
  },

  "/dashboard": {
    get: {
      tags: ["Platform Intelligence"],
      summary: "Dashboard"
    }
  },

  "/admin/overview": {
    get: {
      tags: ["Platform Intelligence"],
      summary: "Platform Overview"
    }
  },

  "/admin/revenue": {
    get: {
      tags: ["Platform Intelligence"],
      summary: "Revenue Dashboard"
    }
  },

  "/products": {
    get: {
      tags: ["Platform Intelligence"],
      summary: "Platform Products"
    }
  },

  "/imports": {
    get: {
      tags: ["Bulk Data Platform"],
      summary: "Import History"
    },
    post: {
      tags: ["Bulk Data Platform"],
      summary: "Create Import"
    }
  },

  "/imports/upload": {
    post: {
      tags: ["Bulk Data Platform"],
      summary: "Upload CSV"
    }
  },

  "/imports/{id}/process": {
    post: {
      tags: ["Bulk Data Platform"],
      summary: "Process Import",
      parameters: [{
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string"
        }
      }]
    }
  }
}
  },

  apis: []
};

export const swaggerSpec = swaggerJSDoc(options);