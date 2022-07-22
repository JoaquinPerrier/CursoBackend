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

main();