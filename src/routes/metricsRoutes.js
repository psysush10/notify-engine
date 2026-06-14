import express from "express";
import { getMetrics } from "../controllers/metricsController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getMetrics);

export default router;