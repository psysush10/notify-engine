import express
from "express";

import {
  verifyJwt
}
from "../middleware/verifyJwt.js";

const router =
  express.Router();

router.get(
  "/me",

  verifyJwt,

  (
    req,
    res
  ) => {

    res.json({

      tenantId:
        req.tenantId,

      role:
        req.role,

      user:
        req.user

    });

  }
);

export default router;