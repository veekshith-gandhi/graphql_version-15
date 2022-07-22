const classResolver = require("../../../lib/classResolver");

module.exports = {
  deleteEmployee(args) {
    console.log("argss", args);
    return classResolver.deleteEmployeById(args.id);
  },
  addEmployee(args) {
    console.log("add", args);
    return classResolver.addEmployeeDetails(args);
  },
  updateEmployee(args) {
    console.log("update", args);
    return classResolver.updateEmployeeById(args);
  },
};
