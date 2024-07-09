const inquirer = require("inquirer");
const db = require("./db/connection")
function init() {
    inquirer.prompt ([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Quit"]
        },
    ])
    .then(answer => {
        switch(answer.action) {
            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "View All Employees":
                viewAllEmployees();
                break;

            case "Add A Department":
                addDepartment();
                break;

            case "Add A Role":
                addRole();
                break;

            case "Add An Employee":
                addEmployee();
                break;

            case "Update An Employee Role":
                updateEmployeeRole();
                break;

            case "Quit":
                connection.end();
                break;

            default:
                init();
        }
    })
}

function viewAllDepartments() {
    const query = "SELECT * FROM departments";

    db.query(query, (error, res) => {
        if(error) {
            console.error(error.message);
            return init();
        }
        console.table(res);
        init();
    })
}

function viewAllRoles() {
    const query = "SELECT * FROM roles";

    db.query(query, (error, res) => {
        if(error) {
            console.error(error.message);
            return init();
        }
        console.table(res);
        init();
    })
}

function viewAllEmployees() {
    const query = "SELECT * FROM employees";

    db.query(query, (error, res) => {
        if(error) {
            console.error(error.message);
            return init();
        }
        console.table(res);
        init();
    })
}

function addDepartment() {
    
}
init();
