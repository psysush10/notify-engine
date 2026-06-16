import express
from "express";

import {
  authenticate
}
from "../middleware/authMiddleware.js";

import {
  getTenantProductsApi,
  enableTenantProductApi,
  toggleTenantProduct
}
from "../controllers/tenantProductController.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  getTenantProductsApi
);

router.post(
  "/",
  authenticate,
  enableTenantProductApi
);

router.post(
  "/tenant/:tenantId/product",
  toggleTenantProduct
);

export default router;