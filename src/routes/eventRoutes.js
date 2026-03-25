import express from "express";
import { handleEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", handleEvent);

export default router;