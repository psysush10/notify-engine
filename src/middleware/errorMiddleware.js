import { errorResponse } from "../utils/apiResponse.js";
import { logger } from "../platform/logger/logger.js";

export const errorMiddleware =
(
  error,
  req,
  res,
  next
) => {

  logger.error("Unhandled application error",
    {
      requestId: req.requestId,
      error: error.message
    }
  );

  if (
    error.statusCode
  ) {

    return errorResponse(

      res,

      error.statusCode,

      error.errorCode,

      error.message

    );

  }

  return errorResponse(

    res,

    500,

    "INTERNAL_SERVER_ERROR",

    error.message

  );

};