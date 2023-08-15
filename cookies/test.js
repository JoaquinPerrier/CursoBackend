/*function StringChallenge(str) {
  // code goes here
  let newStr = "";
  for (var i = 0; i < str.length - 1; i++) {
    if (str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) {
      newStr = newStr.concat(str[i].toLowerCase());
    } else if (str.charCodeAt(i) > 97 && str.charCodeAt(i) < 122) {
      newStr = newStr.concat(str[i].toUpperCase());
    } else {
      newStr = newStr.concat(str[i]);
    }
  }
  return newStr;
}

var asd = "SADwqee!!!  ResERQWEWQ";
console.log(StringChallenge(asd));
*/

/* POR CADA PELOTA:
R = Radius
x =
y =
z = 
vx =
vy =
vz =
*/

/* Si coincide, imprimir YES
let scrambledArray = "D: 4321 gnitseT";
let orderlyArray = "";

for (let i = 0; i < scrambledArray.length; i++) {
  orderlyArray = orderlyArray.concat(
    scrambledArray[scrambledArray.length - 1 - i]
  );
}

console.log(orderlyArray)*/

let a = 32;

function sumarArafue() {
  a += 30;
}

sumarArafue();

console.log(a);
