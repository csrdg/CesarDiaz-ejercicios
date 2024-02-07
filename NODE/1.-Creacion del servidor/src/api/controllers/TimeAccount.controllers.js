// POST Create

const Flyer = require("../models/Flyer.model");
const TimeAccount = require("../models/TimeAccount.model");
const User = require("../models/User.model");

const createTimeAccount = async (req, res, next) => {
  try {
    await TimeAccount.syncIndexes();

    const customBody = {
      minPayed: req.body?.minPayed,
      minConsumed: req.body?.minConsumed,
      minAvailable: req.body?.minPayed - req.body?.minConsumed,
    };

    const newTimeAccount = new TimeAccount(customBody);
    const savedTimeAccount = await newTimeAccount.save();

    return res
      .status(savedTimeAccount ? 200 : 404)
      .json(
        savedTimeAccount ? savedTimeAccount : "error al crear Time Account"
      );
  } catch (error) {
    return res.status(404).json({
      error: "error catch create Time Account",
      message: error.message,
    });
  }
};

const toggleFlyer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flyers } = req.body;

    const timeAccountById = await TimeAccount.findById(id);
    if (timeAccountById) {
      const arrayIdFlyers = flyers.split(",");

      Promise.all(
        arrayIdFlyers.map(async (flyer, index) => {
          if (timeAccountById.flyers.includes(flyer)) {
            try {
              await TimeAccount.findByIdAndUpdate(id, {
                $pull: { flyers: flyer },
              });
              try {
                await Flyer.findByIdAndUpdate(flyer, {
                  $pull: { timeAccounts: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "Error update flyer",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "Error update time account",
                message: error.message,
              }) && next(error);
            }
          } else {
            try {
              await TimeAccount.findByIdAndUpdate(id, {
                $push: { flyers: flyer },
              });
              try {
                await Flyer.findByIdAndUpdate(flyer, {
                  $push: { timeAccounts: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "Error update flyer",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "Error update time accounts",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await TimeAccount.findById(id).populate("flyers"),
          });
        });
    } else {
      return res.status(404).json("This Time Account doesn't exist");
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

//! ---------------------------- GET BY ¿? --------------------------------------------
// EN ESTE CASO NO TIENE MUCHO SENTIDO, ESTARÍA BIEN SI CADA VENTA ESTUVIERA ASOCIADA A UNA FACTURA. PARA FUTUROS EJERCICIOS
// IMPORTANTE QUE SI UN PRODUCTO NO TIENE NOMBRE SE PUEDA LLEGAR A EL POR ALGUNA REFERENCIA

const getByMinPayed = async (req, res, next) => {
  try {
    const { minPayed } = req.params;
    const timeAccountByPayed = await TimeAccount.find({ minPayed });
    if (timeAccountByPayed === minPayed) {
      return res.status(200).json(timeAccountByPayed);
    } else {
      return res.status(404).json("time account not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding by min payed",
      message: error.message,
    });
  }
};

//! ---------------------------- GET ALL --------------------------------------------
// devuelve un array todos los elementos de ese modelo que existan en la base de datos

const getAll = async (req, res, next) => {
  try {
    const allTimeAccounts = await TimeAccount.find();
    if (allTimeAccounts.length > 0) {
      return res.status(200).json(allTimeAccounts);
    } else {
      return res.status(404).json("time accounts not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding All time accounts",
      message: error.message,
    });
  }
};

//! ---------------------------- GET BY ID --------------------------------------------
// Solo devuelve un endpoint buscado por su id

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const timeAccountId = await TimeAccount.findById(id);
    if (timeAccountId) {
      return res.status(200).json(timeAccountId);
    } else {
      return res.status(404).json("time account id not found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "Catch error finding time account by id",
      message: error.message,
    });
  }
};

//! ---------------------------- DELETE --------------------------------------------

const deleteTimeAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const timeAccount = await TimeAccount.findByIdAndDelete(id);
    // se hace el test para asegurarse de la eliminación completa
    if (timeAccount) {
      const findTimeAccountById = await TimeAccount.findById(id);

      try {
        const test = await Flyer.updateMany(
          { timeAccounts: id },
          { $pull: { timeAccounts: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { timeSells: id },
            { $pull: { timeSells: id } }
          );

          return res
            .status(findTimeAccountById ? 404 : 200)
            .json({ deleteTest: findTimeAccountById ? false : true });
        } catch (error) {
          return res.status(404).json({
            error: "Catch error update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "Catch error update Flyer",
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createTimeAccount,
  toggleFlyer,
  getAll,
  getById,
  getByMinPayed,
  deleteTimeAccount,
};
