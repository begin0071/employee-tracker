// Import Inquirer and MYSQL Modules
const inquirer = require('inquirer');
var mysql = require('mysql');




// Create the connection information for the sql database

var con = mysql.createConnection({
  host: "localhost",
  PORT: "3306",
  user: "root",
  password: "passkeyword",
  database: "employees_db"
});




// Connect to the mysql server and sql database AND LOG a message when connected
con.connect(function (error) {
  if (error) throw error;
  console.log("You are now connected to the employees_db database.");
});




// Call the start function after the connection is made to prompt the user
startQuestions();




//define the startQuestions function that prompts the user for what they would like to do
function startQuestions() {
           //Prompts the user for what they would like to do
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        name: 'action'
      },
    ])


             // Based on their answer, execute either the corresponding SQL query and display the result or end the program
    .then(function (responses) {
      switch (responses.action) {
        case "View Departments":
          con.query("SELECT * FROM department", function (error, result, fields) {
            if (error) throw error;
            console.table(result);
            startQuestions();
          });
          break;

        case "View all Roles":
          con.query("SELECT * FROM role", function (error, result, fields) {
            if (error) throw error;
            console.table(result);
            startQuestions();
          });
          break;

        case "View all Employees":
          con.query("SELECT * FROM employee", function (error, result, fields) {
            if (error) throw error;
            console.table(result);
            startQuestions();
          });
          break;

        case "Add  Department":
          //Prompts the user for the name of the department they would like to add
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the name of the Department?',
                name: 'deptName'
              }
            ])
            .then(function (responses) {
              con.query("INSERT INTO department (names) VALUES('" + responses.deptName + "')");
              startQuestions();
            });

          break;

        case "Add a Role":
          //Prompts the user for the name of the role they would like to add
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the role/title?',
                name: 'roleTitle'
              },
              {
                type: 'input',
                message: 'What is the salary?',
                name: 'salary'
              },
              {
                type: 'input',
                message: 'What is the department id?',
                name: 'deptId'
              }
            ])
            .then(function (responses) {
              con.query("INSERT INTO role (title, salary, department_id) VALUES('" + responses.roleTitle + "', '" + responses.salary + "', " + responses.deptId + ")");
              startQuestions();
            });
          break;

        
          case "Add an Employee":
            // Prompt the user to enter a new employee's first name, last name, role id, and manager id, then insert it into the database
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the first name',
        name: 'firstName'
      },
      {
        type: 'input',
        message: 'What is the last name',
        name: 'lastName'
      },
      {
        type: 'input',
        message: 'What is the role id',
        name: 'roleId'
      },
      {
        type: 'input',
        message: "What is your manager's id",
        name: 'managerId'
      },

    ])
    .then(function (answers) {
      var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('" + answers.firstName + "', '" + answers.lastName + "', " + answers.roleId + ", " + answers.managerId + ")";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Employee added successfully");
        startQuestions();
      });
    });
  break;
case "Update an Employee Role":
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which employee would you like to update (enter id)?',
        name: 'updateEmployee'
      },
      {
        type: 'input',
        message: 'What will be their new role (enter role id)?',
        name: 'updateId'
      },
    ])
    
    .then(function (answers) {
      con.query("UPDATE employee SET role_id = " + answers.updateId + " WHERE id = " + answers.updateEmployee, function (error, results, fields) {
      if (error) {
      console.error(error);
      }
      startQuestions();
      });
      });
      break;
      }
      });
      };
      
      
      