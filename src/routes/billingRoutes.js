import express
from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import {

  getBillingAccountApi,
  updateBillingAccountApi,
  getInvoicePreviewApi

}
from "../controllers/billingController.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  getBillingAccountApi
);

router.put(
  "/",
  authenticate,
  updateBillingAccountApi
);

router.get(
  "/invoice-preview",
  authenticate,
  getInvoicePreviewApi
);

export default router;