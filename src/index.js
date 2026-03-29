import dotenv from "dotenv";
dotenv.config();
import express from "express";
import eventRoutes from "./routes/eventRoutes.js";
import { logEnvironmentStatus } from "./config/envValidation.js";

// AK - 30/Mar/2026: Check environment variables before starting the server
const envValid = logEnvironmentStatus();
if (!envValid) {
  console.error("❌ Environment validation failed. Server may not work correctly.");
  // AK - 30/Mar/2026: We still start the server but with warnings
}

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Notify Engine is running 🚀");
});

// AK - 30/Mar/2026: Route mount
app.use("/event", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});