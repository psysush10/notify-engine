import express from "express";
import { handleEvent } from "../controllers/eventController.js";
import { validateEvent } from "../middleware/validation.js";
import { authenticateAPIKey } from "../middleware/auth.js";

const router = express.Router();

// AK - 30/Mar/2026: Authentication first, then validation, then processing
router.post("/", authenticateAPIKey, validateEvent, handleEvent);

export default router;