const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

const app = express();

dotenv.config();

connect();

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

// Routes
const UserRoutes = require("./src/api/routes/User.routes");
app.use("/api/v1/users/", UserRoutes);

const FlyerRoutes = require("./src/api/routes/Flyer.routes");
app.use("/api/v1/flyers/", FlyerRoutes);

const TimeAccountRoutes = require("./src/api/routes/TimeAccount.routes");
app.use("/api/v1/timeAccounts/", TimeAccountRoutes);

const MessageRoutes = require("./src/api/routes/Message.routes");
app.use("/api/v1/messages/", MessageRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

app.disable("x-powered-by");
app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
);
