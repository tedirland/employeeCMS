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
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// Define Start Function

function start () {

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
    .then(function(answer) {

        if (answer.rootMenu === "View All Employees") {
            viewAll();
        }
        else if (answer.rootMenu === "View All Employees by Department"){
            viewByDept();
        }
        else if (answer.rootMenu === "View All Employees by Manager"){
            viewByManager();
        }
        else if (answer.rootMenu === "Add Employee"){
            addEmployee();
        }
        else if (answer.rootMenu === "Update Employee Role"){
            updateRole();
        }
        else if (answer.rootMenu === "Update Employee Manager"){
            updateManager();
        } else{
            connection.end();
        }

    });
}// End of Start Function
