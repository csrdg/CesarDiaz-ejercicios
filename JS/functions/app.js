//!---------------------------------------------------------------------------
/*
**Iteración #1: Buscar el máximo**
Completa la función que tomando dos números como argumento devuelva el más alto.
*/
//!---------------------------------------------------------------------------

const iteractionOne = (a, b) => {
  if (a > b) {
    return a;
  } else if (b > a) {
    return b;
  } else {
    return "son iguales";
  }
};

const valorMasAlto = iteractionOne(5, 5);
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

const findlongestword = (array) => {
  let longestWord = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > longestWord.length) {
      longestWord = array[i];
    }
  }
  return longestWord;
};

const palabro = findlongestword(avengers);
console.log(palabro);

//!---------------------------------------------------------------------------
/*
**Iteración #3: Calcular la suma**
Calcular una suma puede ser tan simple como iterar sobre un array y sumar cada uno de los elementos.
Implemente la función denominada sumNumbers que toma un array de números como argumento y devuelve 
la suma de todos los números de la matriz.
*/
//!---------------------------------------------------------------------------

const numbers = [1, 2, 3, 5, 45, 37, 58];

const sumNumbers = (array) => {
  let sumAll = 0;
  for (let i = 0; i < array.length; i++) {
    sumAll += array[i];
  }
  return sumAll;
};

const sumatoria = sumNumbers(numbers);
console.log("🚀 ~ sumatoria:", sumatoria);

//!---------------------------------------------------------------------------
// **Iteración #4: Calcular el promedio**
// Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:
//!---------------------------------------------------------------------------

const numbersProm = [12, 21, 38, 5, 45, 37, 6];

const promediaNumbers = (array) => {
  let sumArray = 0;
  for (let i = 0; i < array.length; i++) {
    sumArray += array[i];
  }
  return sumArray / array.length;
};

const promedio = promediaNumbers(numbersProm);
console.log("🚀 ~ promedio:", promedio);

//!---------------------------------------------------------------------------
// **Iteración #5: Calcular promedio de strings**
// Crea una función que reciba por parámetro un array y cuando es un valor number lo sume
// y de lo contrario cuente la longitud del string y lo sume. Puedes usar este array para probar tu función:
//!---------------------------------------------------------------------------

const mixedElements = [6, 1, "Rayo", 1, "vallecano", "10", "upgrade", 8, "hub"];

const averageWord = (array) => {
  let sumNumbers = 0;
  let sumStrings = 0;
  for (i = 0; i < array.length; i++) {
    if (typeof array[i] === "number") {
      sumNumbers += array[i];
    } else if (typeof array[i] === "string") {
      sumStrings += array[i].length;
    }
  }
  return sumNumbers + sumStrings;
};

const sumMixedElements = averageWord(mixedElements);
console.log(`La suma de números y total de caracteres es ${sumMixedElements}`);

//!---------------------------------------------------------------------------
// **Iteración #6: Valores únicos**
// Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados,
// en caso que existan los elimina para retornar un array sin los elementos duplicados.
//!---------------------------------------------------------------------------

const duplicates = [
  "sushi",
  "pizza",
  "burger",
  "potatoe",
  "pasta",
  "ice-cream",
  "pizza",
  "chicken",
  "onion rings",
  "pasta",
  "soda",
];

const eliminaDuplicados = (array) => {
  let sinDuplicados = [];
  for (i = 0; i < array.length; i++) {
    if (!sinDuplicados.includes(array[i])) {
      sinDuplicados.push(array[i]);
    }
  }
  return sinDuplicados;
};

const arraySinDuplicados = eliminaDuplicados(duplicates);
console.log("🚀 ~ arraySinDuplicados:", arraySinDuplicados);

//!---------------------------------------------------------------------------
// **Iteración #7: Buscador de nombres**
// Crea una función que reciba por parámetro un array y el valor que desea comprobar que existe
// dentro de dicho array - comprueba si existe el elemento, en caso que existan nos devuelve un true
// y la posición de dicho elemento y por la contra un false.
//!---------------------------------------------------------------------------

const nameFinder = [
  "Peter",
  "Steve",
  "Tony",
  "Natasha",
  "Clint",
  "Logan",
  "Xabier",
  "Bruce",
  "Peggy",
  "Jessica",
  "Marc",
];

const findName = (array, name) => {
  let acc = 0;
  let posicion = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().trim() === name.toLowerCase().trim()) {
      acc++;
      posicion = i;
    }
  }
  return acc === 0 ? false : true, `Está en la posición ${posicion}`;
};
const nombreencontrado = findName(nameFinder, "peggy");
console.log("🚀 ~ nombreencontrado:", nombreencontrado);

//!---------------------------------------------------------------------------
// **Iteration #8: Contador de repeticiones**
// Crea una función que nos devuelva el número de veces que se repite cada una de las palabras que lo conforma.
//!---------------------------------------------------------------------------

const counterWords = [
  "code",
  "repeat",
  "eat",
  "sleep",
  "code",
  "enjoy",
  "sleep",
  "code",
  "enjoy",
  "upgrade",
  "code",
];

const accRepeticiones = (array, palabraABuscar) => {
  let acc = 0;
  for (let palabra of array) palabra === palabraABuscar && acc++;
  return acc;
};

const resultAccRepeticones = accRepeticiones(counterWords, "sleep");
console.log("🚀 ~ resultAccRepeticones:", resultAccRepeticones);
