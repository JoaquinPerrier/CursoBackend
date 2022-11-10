const serverUrl = "http://localhost:8080/";
const itemsPath = "items/";
const imagesPath = "api/images/";

fetch("http://localhost:8080/api/products")
  .then((response) => response.json())
  .then((data) => mostrarJuegos(data));

function mostrarJuegos(data) {
  console.log(data.productList);
  let listadojuegos = document.querySelector("#listadoProductos");

  // lista_productos
  data.productList.forEach((item) => {
    listadojuegos.innerHTML += `
    <div class="col-12 col-lg-6 juegoconteiner" id="juego-${item.id}">
        <div class="item shadow mb-4" >
            <h3 class="item-title">${item.title}</h3>
            <div class="imgdesc">
            <img class="item-image rounded img-fluid" src=${item.thumbnail}>
            <p>${item.description}</p>
            </div>
            <div class="item-details">
            
            <div class="precioCadaProd col-6">
            
            <span><h4 class="item-price"><u>Precio</u>:</h4><h4>${item.price}  $</h4></span>
                </div>
            
                <div>
                <button class="item-button btn btn-success" data-toggle="modal" data-target="#modalCompra" onclick="" type="button" >Agregar al carrito!</button>
                </div>
            </div>
        </div>
    </div>`;
  });
}
