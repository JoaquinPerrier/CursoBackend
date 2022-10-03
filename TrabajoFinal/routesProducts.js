const express = require("express");
const { Router } = express;
const routerProducts = Router();

const productController = require("./controllers/productController");
const productControllerMongo = require("./controllers/productControllerMongo");
const ISADMIN = true;

routerProducts.get("/products/:id?", (req, res) => {
  // OBTIENE LOS PRODUCTOS DESDE .txt
  //productController.product_list(req, res);

  // OBTIENE LOS PRODUCTOS DESDE MONGO
  productControllerMongo.product_list_mongo(req, res);
});

routerProducts.post(
  "/products",
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send({
        error: -1,
        desc: `route /api/products with POST isn´t auth`,
      });
    } else {
      next();
    }
  },
  // EDIT PARA .txt
  /*(req, res) => {
    productController.create_product(req, res);
  }*/

  // CREA PRODUCTO Y LO INSERTA A MONGO
  (req, res) => {
    productControllerMongo.create_product_mongo(req, res);
  }
);

routerProducts.put(
  "/products/:id",
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send({
        error: -1,
        desc: `route /api/products with PUT isn´t auth`,
      });
    } else {
      next();
    }
  },
  // PUT PARA .txt
  /*(req, res) => {
    productController.edit_product(req, res);
  }*/

  // EDITA PRODUCTO Y LO INSERTA EN MONGO
  (req, res) => {
    productControllerMongo.edit_product_mongo(req, res);
  }
);

routerProducts.delete(
  "/products/:id",
  (req, res, next) => {
    if (ISADMIN == false) {
      res.send({
        error: -1,
        desc: `route /api/products with DELETE isn´t auth`,
      });
    } else {
      next();
    }
  },
  // DELETE PARA .txt
  /*(req, res) => {
    productController.delete_product(req, res);
  }*/

  // ELIMINA PRODUCTO
  (req, res) => {
    productControllerMongo.delete_product_mongo(req, res);
  }
);

module.exports = routerProducts;
