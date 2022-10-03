const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 250 },
  price: { type: Number, required: true, max: 100000 },
  code: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  timestamp: { type: Number, required: true },
  id: { type: Number, required: true },
});

const Producto = model("products", ProductSchema);

module.exports = Producto;
