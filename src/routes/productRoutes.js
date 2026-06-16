import express
from "express";

import {
  getProductsApi
}
from "../controllers/productController.js";

const router =
  express.Router();

router.get(
  "/",
  getProductsApi
);

export default router;