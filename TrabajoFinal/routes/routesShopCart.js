const express = require("express");
const { Router } = express;
const routerShopCart = Router();

const cartControllerFB = require("../controllers/cartControllerFB");
const productController = require("../controllers/productControllerMongo");

routerShopCart.post("/carrito", (req, res) => {
  cartControllerFB.create_cart_FB(req, res);
});

routerShopCart.delete("/carrito/:id", (req, res) => {
  cartControllerFB.delete_cart_FB(req, res);
});

routerShopCart.get("/carrito/:id/products", (req, res) => {
  cartControllerFB.cart_list_FB(req, res);
});

routerShopCart.post("/carrito/:id/products/:id_prod", async (req, res) => {
  let productToAdd = await productController.find_product_for_cart(req, res);
  console.log(productToAdd);

  cartControllerFB.add_product_to_cart_FB(req, res, productToAdd);
});

routerShopCart.delete("/carrito/:id/products/:id_prod", async (req, res) => {
  cartControllerFB.delete_product_from_cart_FB(req, res);
});

module.exports = routerShopCart;
