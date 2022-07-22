const classResolver = require("../../../lib/classResolver");

module.exports = {
  getemployee(args) {
    return classResolver.getEmployeeByIdApi(args.id);
  },
  searchEmployee(args) {
    return classResolver.searchByName(args);
  },
};
