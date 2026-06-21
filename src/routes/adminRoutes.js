import express
from "express";

import {
 getAdminOverviewApi,
 getRevenueAnalyticsApi
}
from "../controllers/adminController.js";
import {
  adminLoginPage,
  adminLogin,
  adminLogout
} from "../controllers/adminAuthController.js"

import { authenticate } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { authorize } from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import { getRevenueAnalytics } from "../services/adminService.js";
import { adminDashboard } from "../controllers/adminDashboardController.js";
import { adminTenants } from "../controllers/adminTenantController.js";
import { adminTenantDetail } from "../controllers/adminTenantDetailController.js";
import { upgradeTenantPlan } from "../controllers/adminSubscriptionController.js";
import { toggleTenantProduct } from "../controllers/tenantProductController.js";
import { rotateApiKeyAdmin } from "../controllers/apiKeyController.js";


const router =
 express.Router();

router.get(
  "/login",
  adminLoginPage
);

router.post(
  "/login",
  adminLogin
);

router.get(
  "/logout",
  adminLogout
);

router.use(
  requireAdmin
);

router.get(
 "/overview",
 getAdminOverviewApi
);

router.get(
    "/revenue",
    getRevenueAnalyticsApi
);

router.get(
 "/dashboard",
 authorize(ROLES.ADMIN),
 adminDashboard
);

router.get(
  "/tenants",
  adminTenants
);

router.get(
  "/tenant/:tenantId",
  adminTenantDetail
);

router.post(
  "/tenant/:tenantId/plan",
  upgradeTenantPlan
);

router.post(
  "/tenant/:tenantId/product",
  toggleTenantProduct
);

router.post(
  "/tenant/:tenantId/apikey/rotate",
  rotateApiKeyAdmin
);


export default router;