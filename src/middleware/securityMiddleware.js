import { logger }
from "../platform/logger/logger.js";

export const validateEventPayload =
(
  req,
  res,
  next
) => {

  const {
    type,
    project,
    severity
  } = req.body;

  if (

    !type ||
    !project ||
    !severity

  ) {

    logger.audit(

      "Invalid payload",

      {
        tenantId:
          req.tenantId,

        payload:
          req.body
      }

    );

    return res
      .status(400)
      .json({

        error:
          "type, project and severity are required"

      });

  }

  next();

};

export const validateContentType =
(
  req,
  res,
  next
) => {

  if (

    !req.is(
      "application/json"
    )

  ) {

    logger.audit(

      "Invalid content type",

      {
        tenantId:
          req.tenantId,

        contentType:
          req.headers[
            "content-type"
          ]
      }

    );

    return res
      .status(415)
      .json({

        error:
          "application/json required"

      });

  }

  next();

};