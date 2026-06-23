import {
  login,
  setupPassword
}
from "../services/authService.js";

export const setupPasswordApi =
async (
  req,
  res
) => {

  try {

    const {
      tenantId,
      email,
      password
    } = req.body;

    const result =
      await setupPassword(
        tenantId,
        email,
        password
      );

    res.json({

      success: true,

      message: "Passoword configured successfully"

    });

  } catch(error){

    res.status(500).json({

      success: false,

      error:
        error.message

    });

  }

};

export const loginApi =
async (
  req,
  res
) => {

  try {

    const {
      tenantId,
      email,
      password
    } = req.body;

    const result =
      await login(
        tenantId,
        email,
        password
      );

    res.json({

      success: true,

      ...result

    });

  } catch(error){

    res.status(401).json({

      success: false,

      error:
        error.message

    });

  }

};