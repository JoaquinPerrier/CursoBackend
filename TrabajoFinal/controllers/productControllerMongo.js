const productModelMongo = require("../models/productModelMongo");

exports.product_list_mongo = async function (req, res) {
  let productListMongo = await productModelMongo.findProducts(req, res);
  res.send({ message: "Status OK", productList: productListMongo });
};

/*exports.create_product = async function (req, res) {
  let productAdded = await productModel.createProduct(req, res);
  res.send({ message: "Creation OK", productAdded: productAdded });
};

exports.edit_product = async function (req, res) {
  let productEditted = await productModel.editProduct(req, res);
  res.send({ message: "Editation OK", productEditted: productEditted });
};

exports.delete_product = async function (req, res) {
  let productList = await productModel.deleteProduct(req, res);
  res.send({ message: "Delete OK", productList: productList });
};

exports.find_product_for_cart = async function (req, res) {
  let productFound = await productModel.findProductForCart(req, res);
  return productFound;
};*/
