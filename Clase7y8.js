const express = require("express");
const { Router } = express;

const app = express();
const router = Router();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`El error es ${error}`));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// RUTAS

// GET
//app.get('/', (req,res)=>{
//    res.send("ESCUCHANDO");
//});

// localhost:3000/usuarios
//app.get('/products', (req,res)=>{
//    res.status(200).json(productos);
//});

//app.post('/products', (req,res)=>{
// VER QUE OBJETO NUEVO ENVIÓ
//    const respuesta ={
//        success:'ok',
//        newProduct:{
//            id:103,
//            name:'adidas gloves',
//            price:150
//        },
//    };
//    res.json(respuesta);

//});

let productos = [
  { id: 100, name: "nike ball", price: 100 },
  { id: 101, name: "adidas shoes", price: 300 },
  { id: 102, name: "nike shirt", price: 230 },
];
//GET SIN NADA
/*app.get('/products', (req, res) => {
    res.json(productos)
});*/

//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
app.get("/products", (req, res) => {
  const { query } = req;
  // http://localhost:8080/products?price=varPrecio PARA ENVIARLE UNA QUERY. SI NO, ENVIA TODOS LOS PROD
  console.log(query);
  if (query.price) {
    res.json(productos.filter((el) => el.price == query.price));
  } else {
    res.json(productos);
  }
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const found = productos.find((el) => el.id == id);
  console.log(found);
  if (found) {
    res.json(found);
  } else {
    res.send("NO SE ENCONTRO");
  }
});

//POST CON BODY (SIN ID!!)
app.post("/products", (req, res) => {
  const { body } = req;
  console.log(body);
  // ASIGNARLE UN ID AL OBJETO
  body.id = 108;

  res.json({ success: "ok", newProduct: body });
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const productoToChange = productos.find((el) => el.id == id);
  productoToChange.price = body.price;
  console.log(productoToChange, body);
  res.send("PRECIO CAMBIAO");
});

//DELETE CON ID PARAMS SIEMPRE
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productsFilteredById = productos.filter((item) => item.id != id);
  console.log(productsFilteredById);
  res.json({ success: "ok" });
});
