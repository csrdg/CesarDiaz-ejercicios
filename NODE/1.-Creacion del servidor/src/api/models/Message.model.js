const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["private", "public"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // User o cosa que recibirá el mensaje
    recipientFlyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flyer",
    },
    recipientTimeAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeAccount",
    },
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
