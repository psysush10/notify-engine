import express
from "express";

import {
 authenticate
}
from "../middleware/authMiddleware.js";

import {

 generateInvoiceApi,
 getInvoicesApi,
 markInvoicePaidApi

}
from "../controllers/invoiceController.js";

const router =
 express.Router();

router.post(
 "/generate",
 authenticate,
 generateInvoiceApi
);

router.get(
 "/",
 authenticate,
 getInvoicesApi
);

router.patch(
  "/:id/pay",
  authenticate,
  markInvoicePaidApi
);

export default router;