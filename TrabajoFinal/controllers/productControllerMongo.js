const productModelMongo = require("../models/productModelMongo");

exports.product_list_mongo = async function (req, res) {
  try {
    let productListMongo = await productModelMongo.findProductsMongo(req, res);

    if (!productListMongo && req.params.id) {
      throw new Error("No existe un producto con ese codigo");
    }

    res
      .status(200)
      .send({ message: "Status OK", productList: productListMongo });
  } catch (error) {
    res.status(401).send({ Error: error.message });
  }
};

exports.create_product_mongo = async function (req, res) {
  let productAdded = await productModelMongo.createProductMongo(req, res);
  res.send({ message: "Creation OK", productAdded: productAdded });
};

exports.edit_product_mongo = async function (req, res) {
  let productEditted = await productModelMongo.editProductMongo(req, res);
  res.send({ message: "Editation OK", productEditted: productEditted });
};

exports.delete_product_mongo = async function (req, res) {
  let productList = await productModelMongo.deleteProductMongo(req, res);
  res.send({ message: "Delete OK", productList: productList });
};

/*exports.find_product_for_cart = async function (req, res) {
  let productFound = await productModelMongo.findProductForCart(req, res);
  return productFound;
};*/
