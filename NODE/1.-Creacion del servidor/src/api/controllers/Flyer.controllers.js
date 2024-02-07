const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const enumOk = require("../../utils/enumOk");
const Flyer = require("../models/Flyer.model");
const TimeAccount = require("../models/TimeAccount.model");
const User = require("../models/User.model");

const createFlyer = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await Flyer.syncIndexes();

    const newFlyer = new Flyer(req.body);

    if (req.file) {
      newFlyer.image = catchImg;
    } else {
      newFlyer.image =
        "https://res.cloudinary.com/deck6wgqf/image/upload/v1707265031/sky_diver_sk97wh.png";
    }

    try {
      const savedFlyer = await newFlyer.save();
      return res
        .status(savedFlyer ? 200 : 404)
        .json(savedFlyer ? savedFlyer : "Error creating Flyer");
    } catch (error) {
      return res.status(404).json("General error creating Flyer");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImg);

    return (
      res.status(404).json({
        message: "Error creating element",
        error: error,
      }) && next(error)
    );
  }
};

const toggleTimeAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { timeAccounts } = req.body;

    const flyerById = await Flyer.findById(id);
    if (flyerById) {
      const arrayIdTimeAccounts = timeAccounts.split(",");

      Promise.all(
        arrayIdTimeAccounts.map(async (timeAccount, index) => {
          if (flyerById.timeAccounts.includes(timeAccount)) {
            try {
              await Flyer.findByIdAndUpdate(id, {
                $pull: { timeAccounts: timeAccount },
              });
              try {
                await TimeAccount.findByIdAndUpdate(timeAccount, {
                  $pull: { flyers: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "Error update time account",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "Error update flyer",
                message: error.message,
              }) && next(error);
            }
          } else {
            try {
              await Flyer.findByIdAndUpdate(id, {
                $push: { timeAccounts: timeAccount },
              });
              try {
                await TimeAccount.findByIdAndUpdate(timeAccount, {
                  $push: { flyers: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "Error update time account",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "Error update flyer",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Flyer.findById(id).populate("timeAccounts"),
          });
        });
    } else {
      return res.status(404).json("This Flyer doesn't exist");
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: "Error catch",
        message: error.message,
      }) && next(error)
    );
  }
};

//! ---------------------------- GET BY NAME --------------------------------------------
// devuelve un array de todos los elementos que coincidan con el "name"

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const flyerByName = await Flyer.find({ name });
    if (flyerByName.length > 0) {
      return res.status(200).json(flyerByName);
    } else {
      return res.status(404).json("name not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding by name",
      message: error.message,
    });
  }
};

//! ---------------------------- GET ALL --------------------------------------------
// devuelve un array todos los elementos de ese modelo que existan en la base de datos

const getAll = async (req, res, next) => {
  try {
    const allFlyers = await Flyer.find().populate("timeAccounts"); // puedo agragar o quitar el populate, en función de si necesito ver o no lo que hay dentro de ese array
    if (allFlyers.length > 0) {
      return res.status(200).json(allFlyers);
    } else {
      return res.status(404).json("Flyers not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding All Flyers",
      message: error.message,
    });
  }
};

//! ---------------------------- GET BY ID --------------------------------------------
// Solo devuelve un endpoint buscado por su id

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flyerById = await Flyer.findById(id);
    if (flyerById) {
      return res.status(200).json(flyerById);
    } else {
      return res.status(404).json("Flyer id not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding flyer by id",
      message: error.message,
    });
  }
};

//! ---------------------------- DELETE --------------------------------------------

const deleteFlyer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flyer = await Flyer.findByIdAndDelete(id);
    // se hace el test para asegurarse de la eliminación completa
    if (flyer) {
      const findFlyerById = await Flyer.findById(id);

      try {
        const test = await TimeAccount.updateMany(
          { flyers: id },
          { $pull: { flyers: id } }
        );
        console.log(test);

        try {
          await User.updateMany({ students: id }, { $pull: { students: id } });

          return res
            .status(findFlyerById ? 404 : 200)
            .json({ deleteTest: findFlyerById ? false : true });
        } catch (error) {
          return res.status(404).json({
            error: "Catch error update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "Catch error update Time Account",
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------- UPDATE --------------------------------------------

const update = async (req, res, next) => {
  await Flyer.syncIndexes();
  let catchImg = req.file?.patch;
  try {
    const { id } = req.params;
    const flyerById = await Flyer.findById(id);
    if (flyerById) {
      const oldImg = flyerById.image;

      const customBody = {
        _id: flyerById._id,
        image: req.file?.path ? catchImg : oldImg,
        name: req.body?.name ? req.body?.name : flyerById.name,
      };

      if (req.body?.trainig) {
        const resultEnum = enumOk(req.body?.trainig);
        customBody.training = resultEnum.check
          ? req.body?.training
          : flyerById.training;
      }
      try {
        await Flyer.findByIdAndUpdate(id, customBody);
        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //TEST
        const flyerByIdUpdate = await Flyer.findById(id);
        const elementUpdate = Object.keys(req.body);
        let test = {};

        elementUpdate.forEach((item) => {
          if (req.body[item] === flyerByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });
        // se hace por separado para la imagen por no venir del body sino del file
        if (catchImg) {
          flyerByIdUpdate.image === catchImg
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }
        // si no hay ninguna en false, nada ha cambiado, no hay actualización, 404 : 200
        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }
        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {}
    } else {
      return res.status(404).json("Flyer not found");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createFlyer,
  toggleTimeAccount,
  getAll,
  getById,
  getByName,
  deleteFlyer,
  update,
};
