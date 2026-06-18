import express from "express";
import { getMetrics,getProcessingMetrics } from "../controllers/metricsController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getMetrics);
router.get("/processing", authenticate, getProcessingMetrics);

export default router;