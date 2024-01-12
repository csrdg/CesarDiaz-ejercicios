//!---------------------------------------------------------------------------
/*
**Iteración #1: Buscar el máximo**
Completa la función que tomando dos números como argumento devuelva el más alto.
*/
//!---------------------------------------------------------------------------ESTO VA RARO

let numberOne = 5;
let numberTwo = 87;

const iteractionOne = (numberOne, numberTwo) => {
  if (numberOne > numberTwo) {
    console.log(numberOne);
  } else if (numberOne < numberTwo) {
    console.log(numberTwo);
  } else {
    console.log("son iguales");
  }
};

const valorMasAlto = iteractionOne(numberOne, numberTwo);
console.log("🚀 ~ valorMasAlto:", valorMasAlto);

//!---------------------------------------------------------------------------
/*
**Iteración #2: Buscar la palabra más larga**
Completa la función que tomando un array de strings como argumento devuelva el más largo, 
en caso de que dos strings tenga la misma longitud deberá devolver el primero.
*/
//!---------------------------------------------------------------------------

const avengers = [
  "Hulk",
  "Thor",
  "IronMan",
  "Captain A.",
  "Spiderman",
  "Captain M.",
];

const findlongestword = () => {
  const longestWord = avengers[0];
  for (i = 0; i < avengers.lenght; i++) {
    if (avengers[i].lenght > longestWord.lenght) {
      longestWord = avengers[i];
    }
  }
  return longestWord;
};

const palabro = findlongestword();
console.log(palabro);
