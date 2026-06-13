import express from "express";
import { handleEvent } from "../controllers/eventController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, handleEvent);

export default router;