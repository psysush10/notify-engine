export const authorize =
(...allowedRoles) => {

  return (
    req,
    res,
    next
  ) => {

    if (
      !allowedRoles.includes(
        req.role
      )
    ) {

      return res
        .status(403)
        .json({

          success: false,

          error: {

            code:
              "FORBIDDEN",

            message:
              "Insufficient permissions"

          }

        });

    }

    next();

  };

};