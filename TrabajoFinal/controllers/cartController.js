const cartModel = require("../models/cartModel");

exports.cart_list = async function (req, res) {
  let cartList = await cartModel.findProductsOfCart(req, res);
  res.send({ message: "Status OK", cartList: cartList });
};

exports.create_cart = async function (req, res) {
  let cartAdded = await cartModel.createCart(req, res);
  res.send({ message: "Creation OK", cartAdded: cartAdded });
};

exports.delete_cart = async function (req, res) {
  let cartAdded = await cartModel.deleteCart(req, res);
  res.send({ message: "Delete OK", cartAdded: cartAdded });
};

exports.addProductToCart = async function (req, res, productToAdd) {
  let cartAdded = await cartModel.addProductToCart(req, res, productToAdd);
  res.send({ message: "Product added OK", cartAdded: cartAdded });
};
