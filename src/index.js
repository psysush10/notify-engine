import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUi from "swagger-ui-express";
import eventRoutes from "./routes/eventRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import { swaggerSpec } from "./config/swagger.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import statusRoutes from "./routes/statusRoutes.js"
import integrationRoutes from "./routes/integrationRoutes.js";


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Notify Engine is running 🚀");
});

// 👇 Route mount
app.use("/event", eventRoutes);
app.use("/history", historyRoutes);
app.use("/metrics", metricsRoutes);
app.use("/tenant", tenantRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "Notify Engine",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});