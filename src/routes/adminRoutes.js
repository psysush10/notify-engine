import express
from "express";

import {
 getAdminOverviewApi,
 getRevenueAnalyticsApi
}
from "../controllers/adminController.js";
import { getRevenueAnalytics } from "../services/adminService.js";
import { adminDashboard } from "../controllers/adminDashboardController.js";
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

export default router;