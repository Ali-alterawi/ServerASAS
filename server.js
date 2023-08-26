const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const register = require("./routers/register");
const order = require("./routers/order");
const project = require("./routers/project");
const service = require("./routers/service");
const Visa = require("./routers/Visa");
const report = require("./routers/report");
const message = require("./routers/message");
const adminDashBoard = require("./routers/adminDashBoard");

const dbURI =
  "mongodb+srv://aliibrahim199626:12341234@cluster0.usrf1xv.mongodb.net/ASAS";

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to ASAS server");
// });
app.use("/images", express.static("images"));
app.use("/projects", express.static("projects"));
app.use("/public", express.static("public"));
app.use(register);
app.use(order);
app.use(project);
app.use(service);
app.use(Visa);
app.use(report);
app.use(message);
app.use(adminDashBoard);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};
