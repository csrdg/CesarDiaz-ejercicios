// **Iteración #1: Usa includes**
// Haz un bucle y muestra por consola todos aquellos valores del array que incluyan la palabra "Camiseta".
// Usa la función .***includes*** de javascript.

const products = [
  "Camiseta de Pokemon",
  "Pantalón coquinero",
  "Gorra de gansta",
  "Camiseta de Basket",
  "Cinrurón de Orión",
  "AC/DC Camiseta",
];

const findCamiseta = (array, producto) => {
  let productosConCamiseta = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(producto)) productosConCamiseta.push(array[i]);
  }
  return productosConCamiseta;
};

const resultsFindCamiseta = findCamiseta(products, "Camiseta");
console.log("🚀 ~ resultsFindCamiseta:", resultsFindCamiseta);

// **Iteración #2: Condicionales avanzados**
// Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y añade la propiedad
// ***isApproved*** a true o false en consecuencia.

const alumns = [
  { name: "Pepe Viruela", T1: false, T2: false, T3: true },
  { name: "Lucia Aranda", T1: true, T2: false, T3: true },
  { name: "Juan Miranda", T1: false, T2: true, T3: true },
  { name: "Alfredo Blanco", T1: false, T2: false, T3: false },
  { name: "Raquel Benito", T1: true, T2: true, T3: true },
];

// **Iteración #3: Probando For...of**
// Usa un bucle forof para recorrer todos los destinos del array. Imprime en un ***console.log*** sus valores.

const placesToTravel = [
  "Japon",
  "Venecia",
  "Murcia",
  "Santander",
  "Filipinas",
  "Madagascar",
];

for (let place of placesToTravel) {
  console.log(place);
}

// **Iteración #4: Probando For...in**
// Usa un **for...in** para imprimir por consola los datos del alienígena.

const alien = {
  name: "Wormuck",
  race: "Cucusumusu",
  planet: "Eden",
  weight: "259kg",
};

for (let datos in alien) {
  console.log(`${datos}: ${alien[datos]}`);
}

// **Iteración #5: Probando For**
// Usa un bucle **for** para recorrer todos los destinos del array y elimina los elementos que tengan
// el id 11 y 40. Imprime en un ***console log*** el array.

const placesToTravelFor = [
  { id: 5, name: "Japan" },
  { id: 11, name: "Venecia" },
  { id: 23, name: "Murcia" },
  { id: 40, name: "Santander" },
  { id: 44, name: "Filipinas" },
  { id: 59, name: "Madagascar" },
];

const menosPlacesToTravel = [];

for (i = 0; i < placesToTravelFor.length; i++) {
  const place = placesToTravelFor[i];
  if (place.id !== 11 && place.id !== 40) {
    menosPlacesToTravel.push(place);
  }
}

console.log(menosPlacesToTravel);

// **Iteración #6: Mixed For...of e includes**
// Usa un bucle **for...of** para recorrer todos los juguetes y elimina los que incluyan la palabra gato.
// Recuerda que puedes usar la función ***.includes()***

const toys = [
  { id: 5, name: "Buzz MyYear" },
  { id: 11, name: "Action Woman" },
  { id: 23, name: "Barbie Man" },
  { id: 40, name: "El gato con Guantes" },
  { id: 40, name: "El gato felix" },
];

const toysSinGato = [];

for (let toy of toys) {
  if (!toy.name.includes("gato")) toysSinGato.push(toy);
}
console.log(toysSinGato);

// **Iteración #7: For...of avanzado**
// Usa un bucle **for...of** para recorrer todos los juguetes y añade los que tengan más de 15 ventas
// (sellCount) al array popularToys.

const popularToys = [];
const toysTwo = [
  { id: 5, name: "Buzz MyYear", sellCount: 10 },
  { id: 11, name: "Action Woman", sellCount: 24 },
  { id: 23, name: "Barbie Man", sellCount: 15 },
  { id: 40, name: "El gato con Guantes", sellCount: 8 },
  { id: 40, name: "El gato felix", sellCount: 35 },
];

for (const toy of toysTwo) {
  if (toy.sellCount > 15) popularToys.push(toy);
}
console.log(popularToys);
