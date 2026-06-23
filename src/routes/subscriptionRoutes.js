import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import {
  getSubscriptionApi,
  updateSubscriptionApi
}
from "../controllers/subscriptionController.js";

import { verifyJwt } from "../middleware/verifyJwt.js";

import {authorize } from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

const router =
  express.Router();

router.get(

  "/",

  verifyJwt,

  authorize(

    ROLES.TENANT_ADMIN,

    ROLES.TENANT_OPERATOR,

    ROLES.VIEWER

  ),

  getSubscriptionApi

);

router.put(

  "/",

  verifyJwt,

  authorize(

    ROLES.TENANT_ADMIN

  ),

  updateSubscriptionApi

);

export default router;