import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import path from "path";

import eventRoutes from "./routes/eventRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import tenantProductRoutes from "./routes/tenantProductRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import testJwtRoutes from "./routes/testJwtRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import importRoutes from "./routes/importRoutes.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { requestIdMiddleware } from "./middleware/requestIdMiddleware.js";

import { swaggerSpec } from "./config/swagger.js";
import { env } from "./config/env.js";
import { fileURLToPath } from "url";

const app = express();

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

app.use(
  express.static(
    path.join(
      __dirname,
      "public"
    )
  )
);

app.use(
  express.json({
    limit: "100kb"
  })
);

app.use(requestIdMiddleware);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false
  })
);

app.get("/", (req, res) => {

  res.send(
    "Notify Engine is running 🚀"
  );

});

app.use(
  "/event",
  eventRoutes
);

app.use(
  "/history",
  historyRoutes
);

app.use(
  "/metrics",
  metricsRoutes
);

app.use(
  "/imports",
  importRoutes
);

app.use(
  "/tenant",
  tenantRoutes
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  "/event-status",
  statusRoutes
);

app.use(
  "/tenant/integrations",
  integrationRoutes
);

app.use(
  "/dashboard",
  dashboardRoutes
);

app.use(
  "/tenant/usage",
  usageRoutes
);

app.use(
  "/tenant/subscription",
  subscriptionRoutes
);

app.use(
  "/tenant/billing",
  billingRoutes
);

app.use(
  "/products",
  productRoutes
);

app.use(
  "/tenant/products",
  tenantProductRoutes
);

app.use(
  "/admin",
  adminRoutes
);

app.use(
  "/tenant/invoices",
  invoiceRoutes
);

app.use(
  "/customer",
  customerRoutes
);

app.use(
  "/auth",
  authRoutes
);

app.use(
  "/users",
  userRoutes
);

app.use(
  "/jwt",
  testJwtRoutes
);

app.use(
  "/account",
  accountRoutes
);

app.use(
  "/health",
  healthRoutes
);

app.use(errorMiddleware);

export default app;