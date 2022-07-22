module.exports = `
    type Query {
        getemployee(id:String):getemployeedetails
        deleteEmployee(id:String):deleteEmployeeDetails
        addEmployee(id:String,first_name:String,last_name:String,salary:String,date:String,departement:String):addEmployeedetails
        updateEmployee(id:String,name:String):updateEmployeeName
        searchEmployee(name:String):[searchEmployeName]
    }
    type searchEmployeName{
        Employee_id:Int
        First_name:String
        Last_name:String
        Salary:Int
        Joining_date:String
        Departement:String
    }
    type updateEmployeeName{
        RESPONSECODE:Int
        ERRCODE:Int
        RESPONSEMSG:String
    }
    type addEmployeedetails{
        RESPONSECODE:Int
        ERRCODE:Int
        RESPONSEMSG:String
    }
    type deleteEmployeeDetails{
        RESPONSECODE:Int
        ERRCODE:Int
        RESPONSEMSG:String 
    }
    type getemployeedetails{
        Employee_id:Int
        First_name:String
        Last_name:String
        Salary:Int
        Joining_date:String
        Departement:String
    }
`;
