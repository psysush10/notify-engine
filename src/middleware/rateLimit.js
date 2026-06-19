import { RATE_LIMITS } from "../constants/rateLimits.js";
const requestStore = {};

export const rateLimit =(req,res,next) => {

  const tenantId = req.tenantId;
  const limit = RATE_LIMITS[req.plan];

  const currentMinute =
    Math.floor(
      Date.now() / 60000
    );

  if (!requestStore[tenantId]) {

    requestStore[tenantId] = {

      minute:
        currentMinute,

      count:
        0

    };

  }

  const tenantData =
    requestStore[tenantId];

  if (tenantData.minute !==currentMinute) {

    tenantData.minute =
      currentMinute;

    tenantData.count =
      0;

  }

  tenantData.count++;

  if (
    tenantData.count > limit
  ) {

    return res.status(429)
      .json({

        error:
          "Rate limit exceeded"

      });

  }

  next();

};