import express
from "express";

import {

  getUsersApi,
  createUserApi,
  updateRoleApi,
  updateStatusApi

}
from "../controllers/userController.js";

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
  getUsersApi
);

router.post(
  "/",
  createUserApi
);

router.put(
  "/:email/role",
  updateRoleApi
);

router.put(
  "/:email/status",
  updateStatusApi
);

export default router;