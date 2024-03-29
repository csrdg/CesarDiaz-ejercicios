const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros"],
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    timeSells: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeAccount" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flyer" }],
    // postedMessage: clave creada para funcionar de apoyo. Si Chat, que es la funcional y la que se usa de normal
    // para que el front funcione, es eliminada, siempre podemos recurrir a postedMessage para reconstruir chat,
    // ya que tendrá guardados los mensajes. Es backup
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
