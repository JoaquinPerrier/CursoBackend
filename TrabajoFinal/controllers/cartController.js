const cartModel = require("../models/cartModel");

exports.cart_list = async function (req, res) {
  let cartList = await cartModel.findProductsOfCart(req, res);
  res.send({ message: "Status OK", cartList: cartList });
};

exports.create_cart = async function (req, res) {
  let cartAdded = await cartModel.createCart(req, res);
  res.send({ message: "Creation OK", cartAdded: cartAdded });
};
