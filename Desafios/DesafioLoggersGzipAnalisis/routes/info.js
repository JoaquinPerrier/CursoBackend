import { Router } from "express";
import os from 'os';
const numCPUs = os.cpus().length;
export const infoWebRouter = new Router();

infoWebRouter.get("/info", (req, res) => {
    res.render("info", {
        numCPUs: numCPUs
    })
    console.log(`Argumentos de entrada: ${ process.argv }
    Path de ejecución: ${ process.execPath }
    Nombre de la plataforma (sistema operativo): ${ process.platform }
    Versión de node.js: ${ process.version }
    Process id: ${ process.pid }
    Carpeta del proyecto: ${ process.cwd() }
    Memoria total reservada (rss): ${ process.memoryUsage().rss }
    Cantidad de procesadores: ${ numCPUs }`); 
});