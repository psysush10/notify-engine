import express from "express";

import {

  health,
  postgresHealth,
  sqliteHealth,
  workerHealth,
  platformHealth

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

router.get(
  "/platform",
  platformHealth
);

export default router;