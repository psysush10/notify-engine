import express
from "express";

import {
 authenticate
}
from "../middleware/authMiddleware.js";

import {
 customerDashboard
}
from "../controllers/customerDashboardController.js";

const router =
 express.Router();

router.get(
 "/dashboard",
 //authenticate,
 customerDashboard
);

export default router;