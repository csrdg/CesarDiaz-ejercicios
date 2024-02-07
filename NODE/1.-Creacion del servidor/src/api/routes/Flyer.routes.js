const { upload } = require("../../middleware/files.middleware");
const {
  createFlyer,
  toggleTimeAccount,
  getByName,
  getAll,
  getById,
  deleteFlyer,
} = require("../controllers/Flyer.controllers");

const FlyerRoutes = require("express").Router();

FlyerRoutes.post("/createFlyer", upload.single("image"), createFlyer);

FlyerRoutes.patch("/add/:id", toggleTimeAccount);

FlyerRoutes.get("/getByName/:name", getByName);
FlyerRoutes.get("/getAll", getAll);
FlyerRoutes.get("/getById/:id", getById);

FlyerRoutes.delete("/:id", deleteFlyer);

module.exports = FlyerRoutes;
