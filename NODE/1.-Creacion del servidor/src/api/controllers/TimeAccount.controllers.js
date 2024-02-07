// POST Create

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

module.exports = { createTimeAccount };
