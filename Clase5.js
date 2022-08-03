var moment = require('moment'); // require

let hoy = new Date();

let myBorn = moment("1994-04-28");
let today = moment(hoy);
console.log(`Naci el es ${myBorn.get('date')}/${myBorn.get('month')+1}/${myBorn.get('year')} `);
console.log(`Hoy es ${today.get('date')}/${today.get('month')+1}/${today.get('year')} `);
console.log(`Desde mi nacimiento pasaron ${today.diff(myBorn,'year')} años`);
console.log(`Desde mi nacimiento pasaron ${today.diff(myBorn,'days')} dias`);


const productos =[
    {id:1, nombre: 'Escuadra', precio:323.51},
    {id:2, nombre: 'Calculadora', precio:1233.51},
    {id:3, nombre: 'Globo Terraqueo', precio:3323.01},
    {id:4, nombre: 'Paleta de Pintura', precio:523.19},
    {id:5, nombre: 'Reloj', precio:653.51},
    {id:6, nombre: 'Agenda', precio:323.45},
]

// A) Nombre de productos en un string, separado por comas
// B) Precio total
// C) El precio promedio
// D) Menor precio
// E) Mayor precio
let stringNombres = 'Los objetos son: ';
let precioTotal = 0, precioPromedio, mayorPrecio = 0, menorPrecio=1000;

productos.forEach(element => {
    stringNombres = stringNombres + element.nombre + ', ';
    precioTotal = precioTotal + element.precio;

    if(mayorPrecio<element.precio){
        mayorPrecio = element.precio;
    }

    if(menorPrecio>element.precio){
        menorPrecio = element.precio;
    }

});
precioPromedio = precioTotal / productos.length;

stringNombres = stringNombres.substring(0, stringNombres.length - 2);

// F) Hacer un objeto y agregarle los puntos anteriores.

const objetoFinal = {
    a:stringNombres,
    b:precioTotal,
    c:precioPromedio,
    d:menorPrecio,
    e:mayorPrecio
}

//console.log(objetoFinal)