//packages required for application
const express = require("express");
const inquirer = require("inquirer"); 
const mysql = require("mysql2");

//declaring port
const PORT = process.env.PORT || 3001; 

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//server connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'L3tsD0this$$', 
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
);

db.connect(err => {
    if (err) throw err;
    console.log("Connected to Employee DB");
    mainMenu();
});

//inquirer prompts

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "What action would you like to take?",
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee',
                'actions completed'],

        }
    ]).then((answer) => {
        switch (answer.options) {
            case 'view all departments':
                viewAllDepts();
                break;
            case 'view all roles':
                viewAllRoles();
                break;
            case 'view all employees':
                viewAllEmp();
                break;
            case 'add a department':
                addDept();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmp();
                break;
            case 'update an employee':
                updateEmp();
                break;
            default: console.log('Actions Complete!')
                break;

        }
    })
};

//Functions for each switch case
function viewAllDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log("All Departments: ");
        console.table(results);
        mainMenu();
    });
};

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log("All Roles: ");
        console.table(results);
        mainMenu();
    });
};

function viewAllEmp() {
    db.query('SELECT * FROM employee JOIN role on employee.role_id = role.roleID', function (err, results) {
        console.log("All Employees: ");
        console.table(results);
        mainMenu();
    });
};

function addDept() {
    console.log("Adding a Department");
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "What is the new department name?"
        }
    ]).then(function(response){
        db.query("INSERT INTO department (deptName) VALUES (?)", [response.deptName], (err, data) => {
            console.table(data);
            mainMenu();
        })
    })
};

function addRole() {
    console.log("Adding a Role: ");
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is this new role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary for this new role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department is this role from?',
            name: 'department',
            choices: [
                'finance',
                'engineering',
                'sales'
            ]
        }
    ]).then(function(response){
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, SELECT id from ")
    })
};

function addEmp() {
    console.log("Adding New Employee: ");
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new Employees first name?',
            name: 'firstName'
        },
        {
            type:'input',
            message: 'What is the new Employees last name?',
            name: 'lastName'
        },
        {
            type:'list',
            message: 'What is the new employees role?',
            name: 'empRole',
            choices: [
                'accountant',
                'financial analyst',
                'engineer',
                'project manager',
                'marketing lead',
                'sales representative',
                'marketing manager'
            ]
        }
    ]).then(function(response){
        db.query('INSERT INTO employee(first_name, last_name, role_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?)', [response.firstName, response.lastName, response.empRole])
        console.log("Employee Added, View all Employees");
    })
};

function updateEmp () {
    console.log("Updating Employee: ");
    db.query("SELECT * from employee", function(err, employeeResults) {
    db.query("SELECT * from role", function (err, roleResults){
        console.log(employeeResults);
        let employees = employeeResults.map(function (employee){
            return {name: employee.first_name + " " + employee.last_name, value: employee.employeeId}
        })
        let roles = roleResults.map(function (role){
            return {name: role.title, value: role.roleId}
        })
        console.log(employees);
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                choices: employees,
                name: "updateEmployee"
            },
            {
                type: "list",
                message: "What is the employees role?",
                choices: roles,
                name: "updateRole"
            }
        ]).then(function (response){
            db.query("UPDATE employee SET role_id = ? WHERE employeeId = ?", [response.updateRole, response.updateEmployee], function (err, data){
                console.log(data);
                mainMenu();
            })
        })
    })
    })
}


//initializes server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

