import express
from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import { getUsage, getMonthlyUsage } from "../controllers/usageController.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  getUsage
);

router.get(
  "/monthly",
  authenticate,
  getMonthlyUsage
);

export default router;