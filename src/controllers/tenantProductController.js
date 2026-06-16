import {
  getTenantProducts,
  enableTenantProduct,
updateTenantProductStatus
}
from "../services/tenantProductService.js";

export const getTenantProductsApi = async (
  req,
  res
) => {

  try {

    const products =
      await getTenantProducts(
        req.tenantId
      );

    res.json(
      products
    );

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

export const enableTenantProductApi = async (
  req,
  res
) => {

  try {

    const {
      productCode
    } = req.body;

    const result =
      await enableTenantProduct(

        req.tenantId,
        productCode

      );

    res.json({

      message:
        "Product enabled",

      product:
        result

    });

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

export const toggleTenantProduct = async (
  req,
  res
) => {

  try {

    const tenantId =
      req.params.tenantId;

    const {
      productCode,
      enabled
    } = req.body;

    await updateTenantProductStatus(
      tenantId,
      productCode,
      enabled === "true"
    );

    res.redirect(
      `/admin/tenant/${tenantId}`
    );

  } catch(error){

    res.status(500).send(
      error.message
    );

  }

};