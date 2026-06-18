import express from "express";

import {
  environmentHealth,
  getEventStatus
}
from "../controllers/statusController.js";

const router =
  express.Router();

router.get("/environment", environmentHealth);

router.get(
  "/:requestId",
  getEventStatus
);

export default router;