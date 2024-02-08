const enumGender = ["hombre", "mujer", "otros"];
const enumTraining = [
  "belly",
  "back",
  "transitions",
  "sit",
  "layouts",
  "head up",
  "head down",
];

const enumOk = (array, word) => {
  console.log(array, word);

  switch (array) {
    case "enumGender":
      if (enumGender.includes(word)) {
        console.log("entro en el true");
        return { check: true, word };
      } else {
        return {
          check: false,
        };
      }
      break;
    case "enumTraining":
      console.log(array, word);
      if (enumTraining.includes(word)) {
        console.log("entro en el true");
        return { check: true, word };
      } else {
        return {
          check: false,
        };
      }
      break;
  }
};

module.exports = enumOk;
