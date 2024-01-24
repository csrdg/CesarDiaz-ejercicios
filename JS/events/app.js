// 1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el
// evento click que ejecute un console log con la información del evento del click

const button = () => `
<button id="btnToClick">EL BOTÓN</button>`;

document.body.innerHTML += button();

const buttonWithEvent = document.querySelector("#btnToClick");
buttonWithEvent.addEventListener("click", (e) => console.log(e));

// 1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.

const focusInput = document.querySelector(".focus");
focusInput.addEventListener("focus", (e) => console.log(e.target.value));

// 1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.

const inputValue = document.querySelector(".value");
inputValue.addEventListener("input", (e) => console.log(e.target.value));
