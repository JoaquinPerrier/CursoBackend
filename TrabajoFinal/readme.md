# Ecommerce Back-End Coderhouse

**END POINTS:**<br>
ENDPOINTS DE PRODUCTOS:
- url.com/api/products/:id? *GET* Obtiene el producto indicado con el id. 
- url.com/api/products *POST* Guarda un producto. 
- url.com/api/products/:id *PUT* Modifica la informacion del producto. 
- url.com/api/products/:id *DELETE* Borra un producto segun el id indicado.

ENDPOINTS DE CARRITO DE COMPRAS:
- url.com/api/carrito/:id/products *GET* Obtiene la informacion de un carrito, junto con los productos dentro del mismo.
- url.com/api/carrito *POST* Crea un nuevo carrito.
- url.com/api/carrito/:id *DELETE* Borra un carrito.
- url.com/api/carrito/:id/products/:id_prod *POST* Agrega un producto a un carrito.
- url.com/api/carrito/:id/products/:id_prod *DELETE* Borra un producto de un carrito.

