const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// se crea una instancia del modelo

const FlyerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    training: {
      type: String,
      enum: [
        "belly",
        "back",
        "transitions",
        "sit",
        "layouts",
        "head up",
        "head down",
      ],
      required: false,
    },
    image: { type: String, required: false },
    timeAccounts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TimeAccount" },
    ],
    activeFlyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Flyer = mongoose.model("Flyer", FlyerSchema);

module.exports = Flyer;
