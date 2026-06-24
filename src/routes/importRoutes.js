import express
from "express";

import {

  createImportJobApi,
  getImportJobsApi,
  getImportJobApi,
  processImportJobHandler

}
from "../controllers/importController.js";

import {
  authenticate
}
from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.use(
  authenticate
);

router.post(
  "/",
  createImportJobApi
);

router.get(
  "/",
  getImportJobsApi
);

router.get(
  "/:id",
  getImportJobApi
);

router.post(
  "/:id/process",
  processImportJobHandler
);

export default router;