const inquirer = require('inquirer')
const { prompt } = require('inquirer')
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require('./config/index')
const db = require('./config/index')
require('console.table')

function initDirectory() {
    inquirer.prompt([
        {
            message: `\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        this is . . . \n        DISCOUNT HR !\n\n        let's get started\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`,
            name: 'menu',
            type: 'list',
            choices: [
                {
                    name:  '• ━━━ view departments',
                    value: 'viewDepartments'
                },
                {
                    name:  '• ━━━ view all roles',
                    value: 'viewRoles'
                },
                {
                    name: '• ━━━ view all employees',
                    value: 'viewEmployees'
                },
                {
                    name: '• ━━━ add a department',
                    value: 'addDepartment'
                },
                {
                    name: '• ━━━ add a role',
                    value: 'addRole'
                },
                {
                    name: '• ━━━ add an employee',
                    value: 'addEmployee'
                },
                {
                    name: '• ━━━ update employee data',
                    value: 'updateEmployee'
                },
                {
                    name: '• ━━━ none, i am done',
                    value: 'quit'
                },
            ]
        }
    ])
    .then(res => {
        let choice = res.menu;

        switch(choice) {
            case 'viewDepartments':
                methodViewDepartments();
                break;
            case 'viewRoles':
                methodViewRoles();
                break;
            case 'viewEmployees':
                methodViewEmployees();
                break;
            case 'addDepartment':
                methodAddDepartment();
                break;
            case 'addRole':
                methodAddRole();
                break;
            case 'addEmployee':
                methodAddEmployee();
                break;
            case 'updateEmployee':
                methodUpdateEmployee();
                break;
            case 'quit':
                quit();
        }
    })
}

function quit() {
    console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        thanks for using \n        DISCOUNT HR !\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
    process.exit()
}

function methodViewDepartments() {
    db.viewDepartments
    .then(
        ([data]) => {
            console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        DEPARTMENTS\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
            console.table(data)
        }
    )
    .then(
        () => initDirectory()
    )
}

function methodViewRoles() {
    db.viewRoles()
    .then(
        ([data]) => {
            console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        ROLES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
            console.table(data)
        }
    )
    .then(
        () => initDirectory()
    )
}

function methodViewEmployees() {
    db.viewEmployees()
    .then(
        ([data]) => {
            console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        EMPLOYEES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`)
            console.table(data)
        }
    )
    .then(
        () => initDirectory()
    )
}

function methodAddDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: '━━━ what is the NAME of the department with which you are adding?'
        },
    ])
    .then(res => {
        db.addDepartment(res)
        .then(
            () => console.log('Successfully added!')
        )
        .then(
            () => initDirectory()
        )
    })
}

function methodAddRole() {
    db.viewDepartments()
    .then(
        ([data]) => {
            let departments = data;
            const departmentChoices = departments.map(
                ({ id, name }) => ({
                    name: name,
                    value: id
                })
            )
            
            prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: '━━━ what is the NAME of the role with which you are adding?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: '━━━ what is the SALARY of the role with which you are adding?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: '━━━ what is the DEPARTMENT of the role with which you are adding?',
                    choices: departmentChoices
                }
            ])
            .then(role => {
                db.addRole(role)
                    .then(
                        () => console.log('Successfully added!')
                    )
                    .then(
                        () => initDirectory()
                    )
            })
        }
    )
}

function methodAddEmployee () {
    
}

initDirectory()