const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error("Email or id are missing");
  }
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken };
