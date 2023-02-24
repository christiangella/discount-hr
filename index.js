const inquirer = require('inquirer')
const { prompt } = require('inquirer')
const db = require('./config/index.js')
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
                }
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
    inquirer
    .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: '━━━ what is the FIRST NAME of the employee with which you are adding?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: '━━━ what is the LAST NAME of the employee with which you are adding?'
        }
    ])
    .then(res => {
        let first_name = res.first_name
        let last_name = res.last_name

        db.viewRoles()
        .then(([rows]) => {
            let roles = rows
            const roleChoices = roles.map(
                ({ id, title }) => ({
                    name: title,
                    value: id
                })
            )
        inquirer.prompt({
            type: 'list',
            name: 'role_id',
            message: '━━━ what is the ROLE of the employee with which you are adding?',
            choices: roleChoices
        })
        .then(res => {
            let role_id = res.role_id

            db.viewEmployees()
            .then(([data]) => {
                let employees = data
                const managerChoices = employees.map(
                    ({
                        id, first_name, last_name
                    }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    })
                )
                managerChoices.unshift({ name: "None", value: null });

                prompt({
                    type: 'list',
                    name: 'manager_id',
                    message: '━━━ what is the MANAGER of the employee with which you are adding?',
                    choices: managerChoices
                })
                .then(res => {
                    let employee = {
                        manager_id: res.manager_id,
                        role_id: role_id,
                        first_name: first_name,
                        last_name: last_name
                    }
                    db.addEmployee(employee)
                })
                .then(
                    () => console.log('Successfully added!')
                )
                .then(
                    () => initDirectory()
                )
            })
        })

        })
    })
}

function methodUpdateEmployee () {
    db.viewEmployees()
    .then(([data]) => {
        let employees = data
        const employeeChoices = employees.map(
            ({
                id, first_name, last_name
            }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            })
        );
        prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: '━━━ which EMPLOYEE ROLE do you wish to update?',
                choices: employeeChoices
            }
        ])
        .then(res => {
            let employee_id = res.employee_id
            db.viewRoles()
            .then(([data]) => {
                let roles = data
                const roleChoices = roles.map(
                    ({
                        id, title
                    }) => ({
                        name: title,
                        value: id
                    })
                )
                prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: '━━━ what is the ROLE you wish to add?',
                        choices: roleChoices
                    }
                ])
                .then(
                    res => db.updateEmployee(employee_id, res.role_id)
                )
                .then(
                    () => console.log('Successfully added!')
                )
                .then(
                    () => initDirectory()
                )
            })
        })
    })
}

initDirectory()