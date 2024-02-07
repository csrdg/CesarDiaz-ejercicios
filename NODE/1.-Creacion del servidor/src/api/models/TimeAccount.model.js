const mongoose = require("mongoose");

const TimeAccountSchema = new mongoose.Schema(
  {
    minPayed: { type: Number, required: false },
    minConsumed: { type: Number, required: false },
    minAvailable: { type: Number, required: false },
    flyer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flyer" }],
    activeFlyer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const TimeAccount = mongoose.model("TimeAccount", TimeAccountSchema);

module.exports = TimeAccount;
