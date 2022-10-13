const cartModelFB = require("../models/cartModelFB");

exports.cart_list_FB = async function (req, res) {
  let cartList = await cartModelFB.findProductsOfCartFB(req, res);
  res.send({ message: "Status OK", cartList: cartList });
};

exports.create_cart_FB = async function (req, res) {
  let cartAdded = await cartModelFB.createCartFB(req, res);
  res.send({ message: "Creation OK", cartAdded: cartAdded });
};

exports.delete_cart_FB = async function (req, res) {
  let cartDeletedID = await cartModelFB.deleteCartFB(req, res);
  res.send({ message: "Delete OK", cartDeletedID: cartDeletedID });
};

exports.add_product_to_cart_FB = async function (req, res, productToAdd) {
  let productAdded = await cartModelFB.addProductToCartFB(
    req,
    res,
    productToAdd
  );
  res.send({ message: "Product added OK", productAdded: productAdded });
};

/*exports.delete_product_from_cart_FB = async function (req, res) {
  let cartAdded = await cartModelFB.deleteProductFromCartFB(req, res);
  res.send({ message: "Product deleted OK", cartAdded: cartAdded });
};
*/
