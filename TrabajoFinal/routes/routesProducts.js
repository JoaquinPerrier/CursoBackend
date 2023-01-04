const express = require("express");
const { Router } = express;
const routerProducts = Router();

const productControllerMongo = require("../controllers/productControllerMongo");
const ISADMIN = true;

routerProducts.get("/products/:id?", (req, res) => {
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
  (req, res) => {
    productControllerMongo.delete_product_mongo(req, res);
  }
);

module.exports = routerProducts;
