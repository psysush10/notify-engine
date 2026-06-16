import express
from "express";

import {
  authenticate
}
from "../middleware/authMiddleware.js";

import {
  getTenantProductsApi,
  enableTenantProductApi
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

export default router;