import express
from "express";

import {
  verifyJwt
}
from "../middleware/verifyJwt.js";

import {
  authorize
}
from "../middleware/authorize.js";

import {
  ROLES
}
from "../constants/roles.js";

const router =
  express.Router();

router.get(
  "/me",

  verifyJwt,

  authorize(
    ROLES.TENANT_ADMIN
  ),

  (
    req,
    res
  ) => {

    res.json({

      tenantId:
        req.tenantId,

      role:
        req.role,

      email:
        req.user.email

    });

  }
);

export default router;