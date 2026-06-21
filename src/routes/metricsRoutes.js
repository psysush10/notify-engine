import express from "express";
import { getMetrics,getProcessingMetrics } from "../controllers/metricsController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/", authenticate, authorize(ROLES.TENANT), getMetrics);
router.get("/processing", authenticate, getProcessingMetrics);

export default router;