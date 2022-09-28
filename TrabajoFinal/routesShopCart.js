const express = require("express");
const { Router } = express;
const routerShopCart = Router();

const cartController = require("./controllers/cartController");

routerShopCart.post("/carrito", (req, res) => {
  cartController.create_cart(req, res);
});

routerShopCart.delete("/carrito/:id", (req, res) => {
  cartController.delete_cart(req, res);
});

routerShopCart.get("/carrito/:id/products", (req, res) => {
  cartController.cart_list(req, res);
});

routerShopCart.post("/carrito/:id/products/:id_prod", async (req, res) => {
  // SEARCH FOR THE PRODUCT TO ADD
  let productToAdd = await productController.find_product_for_cart(req, res);

  // ADDING THE PRODUCT TO THE SHOPPING CART
  cartController.add_product_to_cart(req, res, productToAdd);
});

routerShopCart.delete("/carrito/:id/products/:id_prod", async (req, res) => {
  cartController.delete_product_from_cart(req, res);
});

module.exports = routerShopCart;
