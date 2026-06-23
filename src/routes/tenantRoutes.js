import express from "express";

import { ROLES } from "../constants/roles.js";

import {
  getTenantConfigApi,
  updateTenantConfig,
  createTenant,
  getTenants,
  getAllTenantsDbApi,
  updatePlan
} from "../controllers/tenantController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { authorize } from "../middleware/authorize.js";


const router = express.Router();

router.get(
  "/config",
  authenticate,
  getTenantConfigApi
);

router.put(
  "/config",
  verifyJwt,
  authorize( ROLES.TENANT_ADMIN, ROLES.TENANT_OPERATOR),
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