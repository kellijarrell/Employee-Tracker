var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeetracker_DB"
});


connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "employeetracker",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "All Done"]
    })
    .then(function (answer) {
      if (answer.employeetracker === "View All Employees") {
        allEmployees();
      }
      else if (answer.employeetracker === "Add Employee") {
        addEmployee();
      }
      else if (answer.employeetracker === "Update Employee Role") {
        updateEmployeeRole();
      }
      else {
        connection.end();
      }
    });
}

function allEmployees() {
  connection.query("SELECT * FROM employees LEFT JOIN role ON employees.role_id = role.id ", function (err, result) {
    if (err) throw err;

    let table = new Table;
    result.forEach(function (employee){
      table.cell("Id", employee.id)
      table.cell("First Name", employee.first_name)
      table.cell("Last Name", employee.last_name)
      table.cell("Role", employee.title)
      table.cell("Salary", employee.salary)
      table.newRow();
    })
    console.log(table.toString())
    start();
  })
};

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the Employee's first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the Employee's last name?"
        },
        {
          name: "role",
          type: "list",
          message: "What is the Employee's Role",
          choices: data.map(employee => {
            return { name: employee.title, value: employee.id }
          })
        }

      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee was added successfully!");

            start();
          }
        );
      });

  })
};

function updateEmployeeRole() {
  connection.query("SELECT * FROM employees", function (err, data) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "employeeSelect",
          type: "list",
          message: "Which employee would you like to edit?",
          choices: data.map(employeeRole => {
            return { name: employeeRole.first_name, value: employeeRole.id }
          })
        },

      ]).then(function (roleInput) {
        connection.query("SELECT * FROM role", function (err, data) {
          if (err) throw err;

          inquirer
          .prompt([
            {
              name: "newRole",
              type: "list",
              message: "What id their new role?",
              choices: data.map(newRole => {
                return{ name: newRole.title, value: newRole.id }
              })
            }
          ]).then(function (data){
            connection.query("UPDATE employees SET role_id = ? WHERE id = ?",[data.newRole, roleInput.employeeSelect], function(err,data){
              if(err) throw err;
              start();
            })
          })

        })
    
      
      });
  });
};