import express from "express";

import {
  getTenantConfigApi,
  updateTenantConfig,
  createTenant,
  getTenants,
  getAllTenantsDbApi,
  updatePlan
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

router.post(
  "/",
  createTenant
);

router.get(
  "/db",
  getAllTenantsDbApi
)

router.put(
  "/plan",
  authenticate,
  updatePlan
);

export default router;