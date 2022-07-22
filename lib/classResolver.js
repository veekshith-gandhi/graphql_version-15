const connection = require("../config/mysql");

const classResolver = {
  /**
   * GETING EMPLOYEE DETAILS BY ID
   */
  async getEmployeeByIdApi(id) {
    const sqlQuery = `select * from employee where Employee_id=${id}`;
    return await new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.log("error while fetching", err);
          reject(err);
        } else {
          const finalResult = JSON.parse(JSON.stringify(result));
          resolve(finalResult[0]);
        }
      });
    });
  },

  /**
   * DELETING EMPLOYEE BY ID
   */
  async deleteEmployeById(id) {
    const sqlQuery = `delete from employee where Employee_id=${id}`;
    return await new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.log("error while fetching", err);
          reject(err);
        } else {
          let outPutArr = {};
          outPutArr.RESPONSECODE = 1;
          outPutArr.ERRCODE = 0;
          outPutArr.RESPONSEMSG = "deleted sucessfull";
          resolve(outPutArr);
        }
      });
    });
  },

  /**
   * ADDING EMPLOYEE DETAILS
   */
  async addEmployeeDetails(args) {
    const { id, first_name, last_name, salary, date, departement } = args;
    const sqlQuery = `INSERT INTO employee
  (Employee_id, First_name,Last_name,Salary,Joining_date,Departement) 
  VALUES(${id},"${first_name}","${last_name}",${salary},"${date}","${departement}")`;
    return await new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.log("error while fetching", err);
          reject(err);
        } else {
          let outPutArr = {};
          outPutArr.RESPONSECODE = 1;
          outPutArr.ERRCODE = 0;
          outPutArr.RESPONSEMSG = "created sucessfull";
          resolve(outPutArr);
        }
      });
    });
  },

  /**
   * UPDATE NAME
   */
  async updateEmployeeById(args) {
    const { id, name } = args;
    const sqlQuery = `UPDATE employee SET First_name = "${name}" where Employee_id=${id}`;
    return await new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.log("error while fetching", err);
          reject(err);
        } else {
          let outPutArr = {};
          outPutArr.RESPONSECODE = 1;
          outPutArr.ERRCODE = 0;
          outPutArr.RESPONSEMSG = "updated sucessfull";
          resolve(outPutArr);
        }
      });
    });
  },

  /**
   * SEARCH BY NAME AND AVOIDING SQL INJECTION
   * PARSING AND CONVERTING TO STRINGY TO AVOID MYSQL RAWPACKETDATA
   * GRAPHQL ACCESS STRING DATA
   */
  async searchByName(args) {
    let searchQuery = args.name;
    return await new Promise((resolve, reject) => {
      connection.query(
        `select * from employee where First_name like ? or Last_name like ?`,
        ["%" + searchQuery + "%", "%" + searchQuery + "%"],
        (err, rows, field) => {
          if (err) {
            console.log("error while fetching", err);
            reject(err);
          } else {
            const finalResult = JSON.parse(JSON.stringify(rows));
            console.log("finalResult", finalResult);
            resolve(finalResult);
          }
        }
      );
    });
  },
};
module.exports = classResolver;
