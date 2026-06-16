import express
from "express";

import {
  authenticate
}
from "../middleware/authMiddleware.js";

import {
  getSubscriptionApi,
  updateSubscriptionApi
}
from "../controllers/subscriptionController.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  getSubscriptionApi
);

router.put(
  "/",
  authenticate,
  updateSubscriptionApi
);

export default router;