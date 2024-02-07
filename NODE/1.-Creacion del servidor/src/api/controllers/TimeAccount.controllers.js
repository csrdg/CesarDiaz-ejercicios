// POST Create

const Flyer = require("../models/Flyer.model");
const TimeAccount = require("../models/TimeAccount.model");

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

module.exports = { createTimeAccount, toggleFlyer };
