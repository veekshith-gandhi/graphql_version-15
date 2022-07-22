const express = require("express");

const connection = require("./config/mysql");
const route = require("./src/routes/index");

const PORT = 4000;
const app = express();

app.use(express.json());

app.use(
  "/employee",
  (req, res, next) => {
    next();
  },
  route
);

const start = async () => {
  await connection.connect((err) => {
    if (err) console.log("Error while connecting");
    console.log("connected mysql");
  });

  app.listen(PORT, () => {
    console.log("listening", PORT);
  });
};

module.exports = start;
