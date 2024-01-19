// **Iteración #1: Mix for e includes**
// Dado el siguiente javascript usa forof para recorrer el array de películas,
// genera un nuevo array con las categorías de las películas e imprime por consola el array de categorías.
// Ten en cuenta que las categorías no deberían repetirse.
// Para filtrar las categorías puedes ayudarte de la función **.includes()**

const movies = [
  { title: "Madaraspar", duration: 192, categories: ["comedia", "aventura"] },
  { title: "Spiderpan", duration: 122, categories: ["aventura", "acción"] },
  {
    title: "Solo en Whatsapp",
    duration: 223,
    categories: ["comedia", "thriller"],
  },
  {
    title: "El gato con guantes",
    duration: 111,
    categories: ["comedia", "aventura", "animación"],
  },
];

const allCategories = [];

for (const movie of movies) {
  movie.categories.forEach((category) => {
    if (!allCategories.includes(category)) {
      console.log("🚀 ~ movie.categories.forEach ~ category:", category);
      allCategories.push(category);
    }
  });
}

console.log(allCategories);

// **Iteración #2: Mix Fors**
// Dado el siguiente javascript usa forof y forin para hacer la media del volumen de todos los sonidos
//  favoritos que tienen los usuarios.

const users = [
  {
    name: "Manolo el del bombo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 50 },
      rain: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "Mortadelo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 30 },
      shower: { format: "ogg", volume: 55 },
      train: { format: "mp3", volume: 60 },
    },
  },
  {
    name: "Super Lopez",
    favoritesSounds: {
      shower: { format: "mp3", volume: 50 },
      train: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "El culebra",
    favoritesSounds: {
      waves: { format: "mp3", volume: 67 },
      wind: { format: "ogg", volume: 35 },
      firecamp: { format: "mp3", volume: 60 },
    },
  },
];

// for (const user of users) {
//   const mediaVolumePerUser = 0;
//   for (let sound in user.favoritesSounds) {
//     const totalsounds = Object.keys(user.favoritesSounds).lenght;
//     console.log("🚀 ~ totalsounds:", totalsounds);
//   }
// }

// **Iteración #4: Métodos findArrayIndex**
// Crea una función llamada `findArrayIndex` que reciba como parametros un array de textos y un texto y
// devuelve la posición del array cuando el valor del array sea igual al valor del texto que enviaste
// como parametro. Haz varios ejemplos y compruebalos.

const animales = ["Caracol", "Mosquito", "Salamandra", "Ajolote"];

const findArrayIndex = (array, text) => {
  let acc = 0;
  let posicion = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i] === text) {
      acc++;
      posicion = i;
    }
  }
  return (acc = 0
    ? `${text} no está`
    : `${text} está en la posición ${posicion}`);
};

const animalFinder = findArrayIndex(animales, "Salamandra");
console.log("🚀 ~ animalFinder:", animalFinder);

// **Iteración #5: Función rollDice**
// Crea una función llamada **rollDice()** que reciba como parametro el numero de caras que queramos
// que tenga el dado que deberá silumar el codigo dentro de la función.
// Como hemos dicho, que la función use el parametro para simular una tirada de dado y retornar
// el resultado. Si no se te ocurre como hacer un numero aleatorio no te preocupes!
// busca información sobre la función de javascript **Math.random();**

let rollDice = (max) => {
  return Math.floor(Math.random() * max + 1);
};

const resultRollDice = rollDice(6);
console.log("🚀 ~ resultRollDice:", resultRollDice);

// según entiendo el Math.floor se usa para que me entregue un resultado en enteros <= a un numero.
// el Math.random crea el número aleatorio entre 0 y el max, añado +1 para incluir el max.

// **Iteración #6: Función swap**
// Crea una función llamada `swap()` que reciba un array y dos parametros que sean indices del array.
// La función deberá intercambiar la posición de los valores de los indices que hayamos enviado como
// parametro. Retorna el array resultante.

const posiciones = [
  "Mesirve",
  "Cristiano Romualdo",
  "Fernando Muralla",
  "Ronalguiño",
];

const cambiarposiciones = (array, i1, i2) => {
  const posicion1 = array[i1];
  const posicion2 = array[i2];

  array[i1] = posicion2;
  array[i2] = posicion1;

  return array;
};
