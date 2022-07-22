const Router = require("express").Router();

const employee = require("../schema/index");

Router.all("/", (req, res) => {
  res.json({
    RESPONSECODE: "1",
    ERRCODE: "0",
    TITLE: "Welcome to NB GraphQL Server",
  });
});

Router.get("/:type/:version", employee.getEmployeeInfo);
Router.post("/:type/:version", employee.getEmployeeInfo);
Router.delete("/:type/:version", employee.getEmployeeInfo);
Router.patch("/:type/:version", employee.getEmployeeInfo);
Router.post("/:type/:version", employee.getEmployeeInfo);

module.exports = Router;
