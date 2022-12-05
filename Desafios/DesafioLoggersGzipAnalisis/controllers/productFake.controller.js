import { crearProductos } from "../utils/createFakeProducts.js";

import { logger } from "../utils/logger.js";

let productsToSend;

//generador de productos Mocks
const fakeProductGenerator = () => {
  productsToSend = [];
  for (let i = 0; i < 5; i++) {
    productsToSend.push(crearProductos());
  }
};

//Enviar porductos mocks
export const getData = async (req, res) => {
  try {
    fakeProductGenerator();
    res.json(productsToSend);
  } catch (error) {
    logger.error({ error: error.message });
  }
};
