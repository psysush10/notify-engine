import express from "express";
import {
  getHistory,
  getTenantHistory
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getHistory);
router.get("/:tenantId", getTenantHistory);

export default router;