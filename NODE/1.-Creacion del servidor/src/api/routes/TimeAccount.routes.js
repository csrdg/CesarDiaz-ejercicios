const {
  createTimeAccount,
  toggleFlyer,
  getByMinPayed,
  getAll,
  getById,
  deleteTimeAccount,
  update,
} = require("../controllers/TimeAccount.controllers");

const TimeAccountRoutes = require("express").Router();

TimeAccountRoutes.post("/createTimeAccount", createTimeAccount);

TimeAccountRoutes.patch("/add/:id", toggleFlyer);

TimeAccountRoutes.get("/getByMinPayed/:minPayed", getByMinPayed);
TimeAccountRoutes.get("/getAll", getAll);
TimeAccountRoutes.get("/getById/:id", getById);

TimeAccountRoutes.delete("/:id", deleteTimeAccount);

TimeAccountRoutes.patch("/update/:id", update);

module.exports = TimeAccountRoutes;
