const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config()
const mongoose = require("mongoose");
const register = require('./routers/register');
const order = require('./routers/order');
const project = require('./routers/project');
const service = require('./routers/service');
// const orderRouter = require('./routes/orderRouter');
// const massageRouter = require('./routes/massageRouter');

const dbURI = "mongodb+srv://aliibrahim199626:12341234@cluster0.usrf1xv.mongodb.net/ASAS";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!"); 
});
app.use("/images", express.static("images"));
app.use("/projects", express.static("projects"));
app.use(register);
app.use(order);
app.use(project);
app.use(service);



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
