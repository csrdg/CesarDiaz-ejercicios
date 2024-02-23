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
const enumRating = [1, 2, 3, 4, 5];

const enumOk = (array, index) => {
  console.log(array, index);

  switch (array) {
    case "enumGender":
      if (enumGender.includes(index)) {
        console.log("entro en el true");
        return { check: true, index };
      } else {
        return {
          check: false,
        };
      }
      break;
    case "enumTraining":
      console.log(array, index);
      if (enumTraining.includes(index)) {
        console.log("entro en el true");
        return { check: true, index };
      } else {
        return {
          check: false,
        };
      }
      break;
    case "enumRating":
      if (enumRating.includes(index)) {
        console.log("entro en el true");
        return { check: true, index };
      } else {
        return {
          check: false,
        };
      }
      break;
  }
};

module.exports = enumOk;
