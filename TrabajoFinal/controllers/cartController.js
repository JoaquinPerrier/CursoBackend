const cartModel = require("../models/cartModel");

exports.cart_list = async function (req, res) {
  let cartList = await cartModel.findProducts(req, res);
  res.send({ message: "Status OK", cartList: cartList });
};
