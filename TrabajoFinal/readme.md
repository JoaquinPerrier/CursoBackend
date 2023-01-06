# Ecommerce Back-End Coderhouse

**Trabajo practico final del curso de desarrollo Backend de CoderHouse**

**END POINTS:**<br>
ENDPOINTS DE USUARIOS:
- url.com/api/users *POST* Se registra un nuevo usuario.
- url.com/api/login *POST* Se validan las credenciales de un nuevo usuario. 

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

