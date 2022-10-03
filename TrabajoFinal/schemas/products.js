const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 250 },
  price: { type: String, required: true, max: 100 },
  code: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  timestamp: { type: Date, required: true },
  id: { type: Number, required: true },
});

module.exports = model("products", ProductSchema);
