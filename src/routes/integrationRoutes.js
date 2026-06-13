import express from "express";

import {
 getIntegrations,
 updateIntegrations
}
from "../controllers/integrationController.js";

import {
 authenticate
}
from "../middleware/authMiddleware.js";

const router =
 express.Router();

router.get(
 "/",
 authenticate,
 getIntegrations
);

router.put(
 "/",
 authenticate,
 updateIntegrations
);

export default router;