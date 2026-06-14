import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getHistory,
  getTenantHistory
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", authenticate, getHistory);
router.get("/:tenantId", getTenantHistory);

export default router;