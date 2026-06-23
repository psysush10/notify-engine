import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import {

  getBillingAccountApi,
  updateBillingAccountApi,
  getInvoicePreviewApi

}
from "../controllers/billingController.js";

import { verifyJwt } from "../middleware/verifyJwt.js";

import {authorize } from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

const router =
  express.Router();

router.use(
  verifyJwt
);

router.use(
  authorize(
    ROLES.TENANT_ADMIN
  )
);

router.get(
  "/",
  getBillingAccountApi
);

router.put(
  "/",
  updateBillingAccountApi
);

router.get(
  "/invoice-preview",
  getInvoicePreviewApi
);

export default router;