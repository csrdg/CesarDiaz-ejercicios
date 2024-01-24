//!----------------------------------------------------------------------------------------------
// 2.1 Inserta dinamicamente en un html un div vacio con javascript.
// 1. se crea
const newDiv = document.createElement("div");
// 2. se inserta
document.body.appendChild(newDiv);

//!----------------------------------------------------------------------------------------------
// 2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

const template = () => `
<div>
<p>Este es un parrafo dentro de un div</p>
</div>`;
document.body.innerHTML += template();

//!----------------------------------------------------------------------------------------------
// 2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

// se crea div
const divWithSixP = document.createElement("div");

// se hace bucle for para crear elementos p
for (let i = 0; i < 6; i++) {
  const sixP = document.createElement("p");
  sixP.textContent = `Este es el parrafo ${i + 1}`;

  //se insertan las p creadas en el div
  divWithSixP.appendChild(sixP);
}

// se inyecta el div con todo en el body del documento
document.body.appendChild(divWithSixP);

//!----------------------------------------------------------------------------------------------
// 2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.

const pWithText = () => `
<p>Soy dinámico</p>`;

document.body.innerHTML += pWithText();

//!----------------------------------------------------------------------------------------------
// 2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

const hWithClass = () => `
<h2 class=".fn-insert-here">Wubba Lubba dub dub</h2>`;

document.body.innerHTML += hWithClass();

//!----------------------------------------------------------------------------------------------
// 2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.

const apps = ["Facebook", "Netflix", "Instagram", "Snapchat", "Twitter"];

const ulList = document.createElement("ul");

apps.forEach((app) => {
  const elementLi = document.createElement("li");
  elementLi.textContent = app;
  ulList.appendChild(elementLi);
});

document.body.appendChild(ulList);

//!----------------------------------------------------------------------------------------------
// 2.7 Elimina todos los nodos que tengan la clase .fn-remove-me

const allRemoveMe = document.querySelectorAll(".fn-remove-me");

allRemoveMe.forEach((element) => {
  element.remove();
});

//!----------------------------------------------------------------------------------------------
// 2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div.
// 	Recuerda que no solo puedes insertar elementos con .appendChild.

const pVoyEnMedio = document.createElement("p");
pVoyEnMedio.textContent = "Voy en medio";

const allDivInsertHere = document.querySelectorAll("div.fn-insert-here");

const secondDiv = allDivInsertHere[1];

document.body.insertBefore(pVoyEnMedio, secondDiv);

//!----------------------------------------------------------------------------------------------
// 2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here

const insertDivs = document.querySelectorAll("div.fn-insert-here");

const templateNewParrafo = () => `<p>Voy dentro!</p>`;

insertDivs.forEach((div) => (div.innerHTML = templateNewParrafo()));
