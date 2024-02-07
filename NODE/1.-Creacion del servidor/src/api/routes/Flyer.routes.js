const { upload } = require("../../middleware/files.middleware");
const { createFlyer } = require("../controllers/Flyer.controllers");

const FlyerRoutes = require("express").Router();

FlyerRoutes.post("/createFlyer", upload.single("image"), createFlyer);

module.exports = FlyerRoutes;
