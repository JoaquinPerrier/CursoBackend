const express = require("express");
const { Router } = express;
const routerProducts = Router();

const productController = require("./controllers/productController");
const ISADMIN = true;

routerProducts.get("/products/:id?", (req, res) => {
  productController.product_list(req, res);
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
    productController.create_product(req, res);
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
    productController.edit_product(req, res);
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
    productController.delete_product(req, res);
  }
);

module.exports = routerProducts;
