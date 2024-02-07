const {
  createTimeAccount,
  toggleFlyer,
} = require("../controllers/TimeAccount.controllers");

const TimeAccountRoutes = require("express").Router();

TimeAccountRoutes.post("/createTimeAccount", createTimeAccount);

TimeAccountRoutes.patch("/add/:id", toggleFlyer);

module.exports = TimeAccountRoutes;
