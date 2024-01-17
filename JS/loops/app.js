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
