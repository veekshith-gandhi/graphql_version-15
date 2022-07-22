const { buildSchema, graphql } = require("graphql");

const employeeResolver = require("./resolver");
const employeeMutation = require("./mutation/index");
const employeeTypeDefinition = require("./typedef/index");
const employeeQuery = require("./queries/index");
const stringConverter = require("./utils/index");

var empEndPoint = {};
empEndPoint["getemployee"] = { v1: ["getemployee"] };
empEndPoint["deleteEmployee"] = { v1: ["deleteEmployee"] };
empEndPoint["addEmployee"] = { v1: ["addEmployee"] };
empEndPoint["updateEmployee"] = { v1: ["updateEmployee"] };
empEndPoint["searchEmployee"] = { v1: ["searchEmployee"] };

module.exports = {
  getEmployeeInfo(req, res) {
    try {
      let REQUEST = JSON.parse(JSON.stringify(req.query));

      //? CONVERTING TO STRING FORMAT FOR GRAPHQL
      let paramStr = stringConverter.paramsToString(REQUEST);

      let resource;
      let version;
      let param = req.params;
      if (param.type && param.version) {
        resource = param.type;
        version = param.version;
      }

      /**
       * MERGING MUATION AND RESOLVERS
       */
      const resolver = Object.assign(employeeResolver, employeeMutation);

      /**
       * BUILDING SCHEMA
       */
      const schemaType = buildSchema(`${employeeTypeDefinition}`);

      //? GETING API ENDPOINTS
      let value = empEndPoint[resource][version];
      value = value[0];

      /**
       * QUERY WCHICH WILL BE STRING TYPE FOR GRAPHQL
       */
      var query = "{";
      query += value + " " + paramStr + " " + employeeQuery[value];
      query += "}";

      graphql(schemaType, query, resolver).then((response) => {
        if (response.errors) {
          console.log("error", response.errors);
        }
        let OutPutArr = stringConverter.QLOutPut(0, response, value);
        /**
         * RETERNING THE QUERY , HERE CAN SEE IN POSTMAN
         */
        return res.json(OutPutArr);
      });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  },
};
