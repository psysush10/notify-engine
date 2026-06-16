import express
from "express";

import {
 getAdminOverviewApi,
 getRevenueAnalyticsApi
}
from "../controllers/adminController.js";
import { getRevenueAnalytics } from "../services/adminService.js";
import { adminDashboard } from "../controllers/adminDashboardController.js";
import { adminTenants } from "../controllers/adminTenantController.js";
import { adminTenantDetail } from "../controllers/adminTenantDetailController.js";
import { upgradeTenantPlan } from "../controllers/adminSubscriptionController.js";
const router =
 express.Router();

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

export default router;