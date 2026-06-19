export const successResponse = (
  res,
  data,
  status = 200
) => {

  return res
    .status(status)
    .json({

      success: true,

      data

    });

};

export const errorResponse = (
  res,
  status,
  code,
  message
) => {

  return res
    .status(status)
    .json({

      success: false,

      error: {

        code,

        message

      }

    });

};

// Enhance error handling later to do:

// message:
//   process.env.NODE_ENV === "production"
//     ? "Internal Server Error"
//     : error.message