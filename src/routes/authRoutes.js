import express from "express";

import {
  setupPasswordApi,
  loginApi
}
from "../controllers/authController.js";

const router =
  express.Router();

router.post(
  "/setup-password",
  setupPasswordApi
);

router.post(
  "/login",
  loginApi
);

export default router;