const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

const app = express();

dotenv.config();

connect();
