import express from "express";
import { getEventsByTenantDb } from "../repositories/eventRepository.js";
import { handleEvent, getEvents, getEventByRequestId, replayEvent, getEventTimeline } from "../controllers/eventController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authenticate, handleEvent);
router.get("/", authenticate, getEvents);
router.get("/:requestId/timeline", authenticate, getEventTimeline);
router.get("/:requestId", authenticate, getEventByRequestId);
router.post("/:requestId/replay", authenticate, replayEvent);
export default router;