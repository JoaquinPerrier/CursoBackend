const express = require("express");
const { Router } = express;
const routerShopCart = Router();

const cartController = require("./controllers/cartController");
const cartControllerFB = require("./controllers/cartControllerFB");
const productController = require("./controllers/productController");

routerShopCart.post("/carrito", (req, res) => {
  // CREA CARRITO .txt
  // cartController.create_cart(req, res);

  // CREA CARRITO A FB
  cartControllerFB.create_cart_FB(req, res);
});

routerShopCart.delete("/carrito/:id", (req, res) => {
  // BORRA CARRITO DESDE .txt
  //cartController.delete_cart(req, res);

  // BORRA CARRITO A FB
  cartControllerFB.delete_cart_FB(req, res);
});

routerShopCart.get("/carrito/:id/products", (req, res) => {
  // OBTIENE CARRITOS DESDE .txt
  // cartController.cart_list(req, res);

  // OBTIENE CARRITOS DESDE FIREBASE
  cartControllerFB.cart_list_FB(req, res);
});

routerShopCart.post("/carrito/:id/products/:id_prod", async (req, res) => {
  // SEARCH FOR THE PRODUCT TO ADD
  let productToAdd = await productController.find_product_for_cart(req, res);

  // ADDING THE PRODUCT TO THE SHOPPING CART .txt
  //cartController.add_product_to_cart(req, res, productToAdd);

  // ADDING THE PRODUCT TO THE SHOPPING CART IN FB
  cartControllerFB.add_product_to_cart_FB(req, res, productToAdd);
});

/*routerShopCart.delete("/carrito/:id/products/:id_prod", async (req, res) => {
  cartController.delete_product_from_cart(req, res);
});*/

module.exports = routerShopCart;
