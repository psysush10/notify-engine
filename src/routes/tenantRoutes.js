import express from "express";

import {
  getTenantConfigApi,
  updateTenantConfig,
  getTenants
} from "../controllers/tenantController.js";

import { authenticate }
from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/config",
  authenticate,
  getTenantConfigApi
);

router.put(
  "/config",
  authenticate,
  updateTenantConfig
);

router.get(
  "/",
  getTenants
);

export default router;