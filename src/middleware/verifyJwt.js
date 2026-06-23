import jwt from "jsonwebtoken";

import { env }
from "../config/env.js";
import { verifyToken } from "../utils/jwt.js";

export const verifyJwt =
(
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res
        .status(401)
        .json({

          success: false,

          error:
            "Authorization header missing"

        });

    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const payload =
      verifyToken(
        token,
        env.jwtSecret
      );

    req.user = {

      email:
        payload.email,

      role:
        payload.role

    };

    req.role =
      payload.role;

    req.tenantId =
      payload.tenantId;

    next();

  } catch(error){
    
if(
    error.name ===
    "TokenExpiredError"
  ){

    return res
      .status(401)
      .json({

        success:false,

        error:
          "Token expired"

      });

  }

  return res
    .status(401)
    .json({

      success:false,

      error:
        "Invalid token"

    });
}
}