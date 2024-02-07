const { upload } = require("../../middleware/files.middleware");
const {
  createFlyer,
  toggleTimeAccount,
} = require("../controllers/Flyer.controllers");

const FlyerRoutes = require("express").Router();

FlyerRoutes.post("/createFlyer", upload.single("image"), createFlyer);

FlyerRoutes.patch("/add/:id", toggleTimeAccount);

module.exports = FlyerRoutes;
