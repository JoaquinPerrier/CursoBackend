const productModel = require("../models/productModel");

exports.product_list = async function (req, res) {
  let productList = await productModel.findProducts(req, res);
  res.send({ message: "Status OK", productList: productList });
};
