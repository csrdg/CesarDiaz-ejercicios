const { createTimeAccount } = require("../controllers/TimeAccount.controllers");

const TimeAccountRoutes = require("express").Router();

TimeAccountRoutes.post("/createTimeAccount", createTimeAccount);

module.exports = TimeAccountRoutes;
