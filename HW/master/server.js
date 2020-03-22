var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Pistons381!",
    database: "cms_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// Define Start Function

function start() {

    inquirer
        .prompt({

            name: "rootMenu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"]
        })
        .then(function (answer) {

            if (answer.rootMenu === "View All Employees") {
                viewAll();
            }
            else if (answer.rootMenu === "View All Employees by Department") {
                viewByDept();
            }
            else if (answer.rootMenu === "View All Employees by Manager") {
                viewByManager();
            }
            else if (answer.rootMenu === "Add Employee") {
                addEmployee();
            }
            else if (answer.rootMenu === "Update Employee Role") {
                updateRole();
            }
            else if (answer.rootMenu === "Update Employee Manager") {
                updateManager();
            } else {
                connection.end();
            }

        });
}// End of Start Function


function viewAll() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw (err);

        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].id}. Employee Name: ${res[i].first_name} ${res[i].last_name} || Role ID: ${res[i].role_id} || Manager ID: ${res[i].manager_id}
`)


        }
        start();


    })
}// End of ViewAll Function

function viewByDept() {

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err)

        for (var i = 0; i < res.length; i++) {
            console.log(`
${res[i].id}. || ${res[i].name}`)
        }
    })

    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Enter the number of the department's roster you'd like to see"
        }).then(function (answer) {
            var query = "SELECT first_name,last_name FROM employee WHERE role_id = ?"
            connection.query(query, [answer.department], function (err, res) {
                if (err) throw (err);
                for (var i = 0; i < res.length; i++) {
                    console.log(`
Employee: ${res[i].last_name}, ${res[i].first_name} 
_________________________

`)
                }
                
                start();
            })
        })


};// End of viewByDept function

function viewByManager() {

    connection.query("SELECT * FROM managers", function (err, res) {
        if (err) throw (err)

        for (var i = 0; i < res.length; i++) {
            console.log(`
${res[i].id}. || ${res[i].first_name} ${res[i].last_name}`)
        }
    })

    inquirer
        .prompt({
            name: "manager",
            type: "input",
            message: "Enter the number of the manager's direct reports you'd like to see"
        }).then(function (answer) {
            var query = "SELECT first_name,last_name FROM employee WHERE manager_id = ?"
            connection.query(query, [answer.manager], function (err, res) {
                if (err) throw (err);
                for (var i = 0; i < res.length; i++) {
                    console.log(`
Employee: ${res[i].last_name}, ${res[i].first_name} `)
                }

            })

        })

}; // End of viewByManager function

function addEmployee() {

    var newEmployee = inquirer
    .prompt([
        {

        name:"employeeFirstName",
        type: "input",
        message: "Please enter employee's first name"
        

    },
    {
        name:"employeeLastName",
        type: "input",
        message: "Please enter employee's last name"
    },
    {

        name:"employeeDept",
        type: "input",
        message: `Please enter employee's department number from the list below:
---------
1. Sales
2. Operations
3. Accounting
4. Engineering
5. Human Resources
----------

:`

        

    },
    {

        name:"employeeManager",
        type: "input",
        message: `Please enter employee's manager number from the list below:
---------
1. Charles Xavier
2. Winston Churchill 
3. John Shaft
4. Barrett Wallace
5. Elizabeth Warren
----------

:`

    }

]).then(function(answer){

    connection.query("INSERT INTO employee SET ?",
    {first_name: answer.employeeFirstName,
    last_name: answer.employeeLastName,
    role_id: answer.employeeDept,
    manager_id: answer.employeeManager
    },
    function(err,res) {
        if (err) throw (err);
        console.log(`
Added ${answer.employeeFirstName} into the database!`)
    }) 
    start();
})


}// End of Add Employee Function

