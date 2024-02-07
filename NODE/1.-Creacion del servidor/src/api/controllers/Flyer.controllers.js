const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Flyer = require("../models/Flyer.model");
const TimeAccount = require("../models/TimeAccount.model");

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

module.exports = { createFlyer, toggleTimeAccount };
