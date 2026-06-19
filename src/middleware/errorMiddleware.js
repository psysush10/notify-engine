import {
  errorResponse
}
from "../utils/apiResponse.js";

export const errorMiddleware =
(
  error,
  req,
  res,
  next
) => {

  console.error(
    `[${req.requestId}]`,
    error
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