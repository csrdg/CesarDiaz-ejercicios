const {
  createTimeAccount,
  toggleFlyer,
  getByMinPayed,
  getAll,
  getById,
  deleteTimeAccount,
} = require("../controllers/TimeAccount.controllers");

const TimeAccountRoutes = require("express").Router();

TimeAccountRoutes.post("/createTimeAccount", createTimeAccount);

TimeAccountRoutes.patch("/add/:id", toggleFlyer);

TimeAccountRoutes.get("/getByMinPayed/:minPayed", getByMinPayed);
TimeAccountRoutes.get("/getAll", getAll);
TimeAccountRoutes.get("/getById/:id", getById);

TimeAccountRoutes.delete("/:id", deleteTimeAccount);

module.exports = TimeAccountRoutes;
