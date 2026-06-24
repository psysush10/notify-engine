import express
from "express";

import {

  createImportJobApi,
  getImportJobsApi,
  getImportJobApi

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

export default router;