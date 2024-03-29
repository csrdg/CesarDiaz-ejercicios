const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], //array de objetos que vienen de message
    userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
