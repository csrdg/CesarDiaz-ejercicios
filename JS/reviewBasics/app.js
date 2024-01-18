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
