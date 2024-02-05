const { upload } = require("../../middleware/files.middleware");
const {
  registerLargo,
  registerCorto,
  registerWithRedirect,
  sendCode,
  login,
  resendCode,
  checkNewUser,
  autoLogin,
} = require("../controllers/User.controllers");
const express = require("express");
const User = require("../models/User.model");
const UserRoutes = express.Router();

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);

UserRoutes.post("/registerCorto", upload.single("image"), registerCorto);

UserRoutes.post(
  "/registerWithRedirect",
  upload.single("image"),
  registerWithRedirect
);

UserRoutes.post("/register/sendMail/:id", sendCode);

UserRoutes.post("/login", login);

UserRoutes.post("/resendCode", resendCode);

UserRoutes.post("/verificationCode", checkNewUser);

UserRoutes.post("/login/autoLogin", autoLogin);

module.exports = UserRoutes;
