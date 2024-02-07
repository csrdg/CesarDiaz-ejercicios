const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Flyer = require("../models/Flyer.model");

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

module.exports = { createFlyer };
