const { connect } = require("mongoose");

connectMG = async function () {
  try {
    return await connect("mongodb://localhost:27017/products", {
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const db = connectMG();

console.log("CONECTAO CON MONGUITO");
if (!db) throw "can not connect to the db";

module.exports = connectMG;
