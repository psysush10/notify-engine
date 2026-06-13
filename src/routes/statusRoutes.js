import express from "express";

import {
  getEventStatus
}
from "../controllers/statusController.js";

const router =
  express.Router();

router.get(
  "/:requestId",
  getEventStatus
);

export default router;