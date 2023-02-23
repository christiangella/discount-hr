const inquirer = require('inquirer')
const { prompt } = require('inquirer')
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
            ]
        }
    ])
}


initDirectory()