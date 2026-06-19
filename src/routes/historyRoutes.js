import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", authenticate, getHistory);

export default router;