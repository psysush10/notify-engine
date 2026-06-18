import express from "express";

import {

  health,
  postgresHealth,
  sqliteHealth,
  workerHealth,

}
from "../controllers/healthController.js";

const router =
  express.Router();

router.get(
  "/",
  health
);

router.get(
  "/postgres",
  postgresHealth
);

router.get(
  "/sqlite",
  sqliteHealth
);

router.get(
  "/worker",
  workerHealth
);

export default router;