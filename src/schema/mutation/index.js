const classResolver = require("../../../lib/classResolver");

module.exports = {
  deleteEmployee(args) {
    return classResolver.deleteEmployeById(args.id);
  },
  addEmployee(args) {
    return classResolver.addEmployeeDetails(args);
  },
  updateEmployee(args) {
    return classResolver.updateEmployeeById(args);
  },
};
