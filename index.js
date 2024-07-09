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
                db.end();
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
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the name of the department you'd like to add?"
    }).then(answer => {
        const query = `INSERT INTO departments(departments_name) VALUES (?)`
        db.query(query, [answer.name], (error, res) => {
            if(error) {
                console.error(error.message);
                return init();
            }
            console.log("Successfully Added Department!")
            init();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?",
        },

        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
        },

        {
            type: "input",
            name: "departmentsId",
            message: "What is the department ID of the new role?",
        },

    ]).then((answer) => {
        const query = `INSERT INTO roles(title, salary, departments_id) VALUES (?,?,?)`;
        db.query(query, [answer.title, answer.salary, answer.departmentsId], (error, res) => {
            if(error) {
                console.error(error.message);
                return init();
            }
            console.log("Successfully Added New Role!")
            init();
        })
    })
}

function addEmployee() {
    db.query("SELECT id, title FROM roles", (error, res) => {
        if(error) {
            console.error(error.message);
            return;
        }
        const allRoles = res.map(({id, title}) => ({
            name: title,
            value: id,
        }));

    db.query("SELECT id, CONCAT(first_name,' ',last_name) AS managerName FROM employees", (error, res) => {
        if(error) {
            console.error(error.message);
            return;
        }
        const allManagers = res.map(({id, managerName}) => ({
            name: managerName,
            value: id,
        }));

    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?",
        },

        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?",
        },

        {
            type: "list",
            name: "roleId",
            message: "Select the employee role:",
            choices: allRoles,
        },

        {
            type: "list",
            name: "managerId",
            message: "Select the employee's manager:",
            choices: allManagers,
        },

    ]).then((answer) => {
        const query = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        db.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (error, res) => {
            if(error) {
                console.error(error.message);
                return init();
            }
            console.log("Successfully Added New employee!")
            init();
        })
    })
    })
    })
}

// function updateEmployeeRole() {

// }

init();
