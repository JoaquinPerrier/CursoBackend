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

console.log("fin")