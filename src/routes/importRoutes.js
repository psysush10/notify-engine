import express
from "express";

import {

  createImportJobApi,
  getImportJobsApi,
  getImportJobApi,
  processImportJobHandler,
  uploadCsvHandler,
  getImportErrorsApi,
  retryImportJobApi

}
from "../controllers/importController.js";

import {
  authenticate
}
from "../middleware/authMiddleware.js";

import { upload } from "../config/multer.js";

const router =
  express.Router();

router.use(
  authenticate
);

router.post(
  "/",
  createImportJobApi
);

router.post(
  "/upload",

  upload.single(
    "file"
  ),

  uploadCsvHandler
);

router.get(
  "/",
  getImportJobsApi
);

router.post(
  "/:id/retry",
  retryImportJobApi
);

router.get(
  "/:id/errors",
  getImportErrorsApi
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