import {
  getProductsDb
}
from "../repositories/productRepository.js";

export const getProducts =
async () => {

  return await getProductsDb();

};