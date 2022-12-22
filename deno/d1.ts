/*export async function decirAlgo(msg: string): Promise<void> {
  console.log("Hola mundo " + msg);
}

await decirAlgo("Perrito");*/

/*import { parse } from "https://deno.land/std@.161.0/datetime/mod.ts";

const myDate: Date = parse(dateString:'21-06-1982', formatString:"dd-mm-yyy")

console.log(myDate)*/

/* import {
  bgBlue,
  yellow,
  bold,
} from "https://deno.land/std@0.167.0/fmt/colors.ts";

console.log(bgBlue(yellow(bold("Alojaa"))));

console.log(Deno);*/

const numeros: number[] = [
  1, 10, 566, 15555, 0, 9999999, 3, 4, 5, 6, 123213213,
];

numeros.sort(function (a: number, b: number): number {
  return a - b;
});

const min: number = numeros[0];
const max: number = numeros[numeros.length - 1];
const promed: number = (min + max) / numeros.length;

const texto = `
************************************
Números: ${numeros}
Mínimo: ${min}
Máximo: ${max}
Promedio: ${promed}
************************************
`;

await Deno.writeTextFile("test.dat", texto);

import {
  bgWhite,
  red,
  yellow,
  green,
} from "https://deno.land/std@0.167.0/fmt/colors.ts";

const mensaje = `
${yellow(`minimo:  ${min}`)} 
${red(`maximo:  ${max}`)} 
${green(`promedio:  ${promed}`)}
`;

const msg = `${bgWhite(mensaje)}`;

console.log(msg);
