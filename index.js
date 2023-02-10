const inquirer = require('inquirer')

function initDirectory() {
    inquirer
    .prompt([
        {
            name: 'menu',
            message: `\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        this is . . . \n        DISCOUNT HR !\n\n        let's get started\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`,
            type: 'list',
            choices: [
                '• ━━━ view departments',
                '• ━━━ view all roles',
                '• ━━━ view all employees',
                '• ━━━ add a department',
                '• ━━━ add a role',
                '• ━━━ add an employee',
                '• ━━━ update employee data',
                '• ━━━ none, i am done'
            ]
        }
    ])

    .then(function(answer) {
        switch (answer.prompt) {
            case '• ━━━ view departments':
                viewDepartments()
                break
            case '• ━━━ view all roles':
                viewRoles()
                break
            case '• ━━━ view all employees':
                viewEmployees()
                break
            case '• ━━━ add a department':
                addDepartment()
                break
            case '• ━━━ add a role':
                addRole()
                break
            case '• ━━━ add an employee':
                addEmployee()
                break        
            case '• ━━━ update employee data':
                updateEmployee()
                break  
            case '• ━━━ none, i am done':
                db.end();
                console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        thanks for using \n        DISCOUNT HR !\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`)
            }
        }
    )
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        DEPARTMENTS\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory();
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        ROLES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory();
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        EMPLOYEES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory();
    })
}

function addDepartment () {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: '━━━ what is the NAME of the department with which you are adding?'
        },
    ])
    .then((data) => {
        db.query(`INSERT INTO department`), {
            name: data.dept_name
        }
    });
    initDirectory()
}

function addRole () {
    db.query('SELECT * from DEPARTMENT', (err, res) => {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_name',
                message: '━━━ what is the NAME of the role with which you are adding?'
            },
            {
                type: 'input',
                name: 'role_salary',
                message: '━━━ what is the SALARY of the role with which you are adding?'
            },
            {
                type: 'list',
                name: 'role_dept',
                message: '━━━ what is the DEPARTMENT of the role with which you are adding?',
                choices: res.map((department) => department.name)
            }
        ])
        .then((data) => {
            const deptQuery = res.find(department => department.name === data.department)
            db.query('INSERT INTO role', {
                title: data.role_name,
                salary: data.role_salary,
                department_id: deptQuery.id
            })
        })
    })
}

function addEmployee() {
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
        },
        {
            name: 'role_id',
            type: 'input',
            message: '━━━ what is the ROLE ID of the employee with which you are adding?'
        },
    ])
    .then((data) => {
    })
}


initDirectory()