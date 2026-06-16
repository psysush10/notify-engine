import {
  getProducts
}
from "../services/productService.js";

export const getProductsApi =
async (
  req,
  res
) => {

  try {

    const products =
      await getProducts();

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