/*// CLASE 3: ASYNC, AWAIT, PROMISES AND AWAIT.
let pago = new Promise((res,rej)=>{
    setTimeout(()=>{
        res("bien! Pago!");
    },2 * 1000);
})


//ESPERA A QUE SE TERMINE LA PROMISE
pago
//SI SALE BIEN (SALE EN CAMINO RESOLVED)
.then(()=>{
    console.log("EXITO")
})
//SI FRACASA (SALE EN CAMINO REJECTED)
.catch(()=>{
    console.log("FRACASO")
})


//ASYNC AWAIT
async function main(){
    let traerMisAlumnos = ()=>{
        return new Promise((res, rej)=>{
        setTimeout(() => {
            res(["joaquin","claudito",'maykel']);
        }, 4000);
    })
    }

    let respDeAlumnos = await traerMisAlumnos(); //PONIENDO EL AWAIT, SE ESPERA QUE SE EJECUTE TODO LO QUE ESTA ARRIBITA
    console.log(respDeAlumnos);
}

main();*/

// CLASE 4: FILES IN NODE
const fs = require('fs');

    /* DE MANERA SINCRONICA*/
// LEER ARCHIVO
// const data = fs.readFileSync('./text1.txt',"utf-8");
// console.log(data);

// SOBRESCRIBE EL CONTENIDO DE UN ARCHIVO
// fs.writeFileSync('./text1.txt','OTRA COSA PAI!');

// AGREGA UN CONTENIDO AL ARCHIVO (RESPETA LO QUE TENES)
// fs.appendFileSync('./text1.txt','\nOTRA NUEVA COSITA SIN ROMPER NATTY!');

// BORRA ARCHIVO
// fs.unlinkSync('./text1.txt');

//  MANEJO DE ERRORES
//try{
    // No existe este archivo
//    fs.unlink('/text123.txt');
//    console.log("Archivo borrado");
//}catch (err){
//    console.log("ERROR");
//}


    /* DE MANERA ASINCRONICA*/
// LEER ARCHIVO
// fs.readFile('./text1.txt',"utf-8",(err,contenido)=>{
//     if (err){
//         console.log("ERROR")
//     } else{
//         console.log(contenido)
//     }
// })

// SOBRESCRIBE EL CONTENIDO DE UN ARCHIVO.
// fs.writeFile('./text1.txt',"ALGO NUEVO VA AL TXT!",(err)=>{
//     if (err){
//         console.log("ERROR")
//     } else{
//         console.log("contenido modificado del .txt")
//     }
// })

// AGREGA UN CONTENIDO AL ARCHIVO (RESPETA LO QUE TENES)
// fs.appendFile('./text1.txt',"\nTEXTO A AGREGAR, RESPETANDO LO QUE HAY ANTES",(err)=>{
//     if (err){
//         console.log("ERROR")
//     } else{
//         console.log("contenido agregado al final del .txt")
//     }
// })

// BORRA ARCHIVO
fs.unlink('./text1.txt',(err)=>{
    if (err){
        console.log("ERROR")
    } else{
        console.log("ARCHIVITO BORRADO")
    }
})