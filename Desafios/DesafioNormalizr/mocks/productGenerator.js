const { faker } = require("@faker-js/faker");
faker.locale = "es";

function generarProductos(cant = 10) {
  let productos = [];
  for (let i = 0; i < cant; i++) {
    productos.push({
      id: faker.database.mongodbObjectId(),
      title: faker.vehicle.vehicle(),
      price: faker.commerce.price(150, 20000, 0),
      thumbnail: faker.internet.avatar(300, 300),
    });
  }
  return productos;
}
module.exports = generarProductos;
