// Definir variables variables que almacenen los siguiente datos:
// Un nombre: “pepe”
// Una edad: 25
// Un precio: $99.90
// Los nombres de mis series favoritas: “Dark”, “Mr Robot”, “Castlevania”
// Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.
// Mostrar todos esos valores por consola
// Incrementar la edad en 1 y volver a mostrarla
// Agregar una serie a la lista y volver a mostrarla

// let nombre = "pepe";
// let edad = 25;
// let precio = 99.90;
// let seriesFav = ["Dark", "Mr Robot", "Castlevania"];
// let misPeliculasFav = [
//     {nombre:"El señor de los anillos: el retorno del rey",añoEstreno:2003,protagonistas:["Elija wood", "Karl urban","Sean Astin"]},
//     {nombre:"El señor de los anillos: las dos torres",añoEstreno:2002,protagonistas:["Elija wood", "Viggo Mortensen","Sean Astin"]},
//     {nombre:"El señor de los anillos: la comunidad del anillo",añoEstreno:2001,protagonistas:["Ian MacKellen", "Viggo Mortensen","Sean Astin"]},];

// console.log(nombre,edad,precio,seriesFav,misPeliculasFav);

// edad++;
// console.log(edad);

// seriesFav.push("Peaky blinders");
// console.log(seriesFav);

// let numbers = [1,2,3,4,5,6]

// let numbersNew = [...numbers];

// numbersNew.push(123)

// console.log(numbers,numbersNew)
// if(numbers ===numbersNew){
//     console.log("SON IGUALE")
// }

//CON ARROW FUNCTION
// const persona = {
//     nombre:"Joaquin",
//     correo:"joaquinperrier@hotmail.com",
//     presentar:function(){
//         const contacto=()=>{
//             console.log(`Mandame un correo a ${this.correo}`)
//         }
//         console.log(`Hola me llamo ${this.nombre}`);
//         contacto();
//     }
// };

//CON FUNCION NORMAL
// const persona = {
//     nombre:"Joaquin",
//     correo:"joaquinperrier@hotmail.com",
//     presentar:function(){
//         const contacto = function(){
//             console.log(`Mandame un correo a ${this.correo}`)
//         }
//         console.log(`Hola me llamo ${this.nombre}`);
//         contacto();
//     }
// };

// persona.presentar();

class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  getFullname() {
    return this.nombre + " " + this.apellido;
  }

  hablar() {
    console.log("hola");
  }
  contameDeVos() {
    console.log(`Yo soy ${this.nombre} y tengo ${this.edad}`);
  }
}

const persona = new Persona("pepe", 5);
const persona2 = new Persona("guille", 40);

persona.contameDeVos();
persona2.contameDeVos();
