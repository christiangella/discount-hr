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
            
        }
    })

}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        DEPARTMENTS\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory()
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        ROLES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory()
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(`\n\n✧ * ━━━━━━━━━━━━━━━━━━━━━━━━\n\n        currently displaying \n        EMPLOYEES\n\n\n\n   ━━━━━━━━━━━━━━━━━━━━━━━━━ *.\n\n`);
        console.table(res);
        initDirectory()
    })
}


initDirectory()