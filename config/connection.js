const mysql = require('mysql2')
require('dotenv')

const connection = mysql.createConnection (
    new Sequelize (
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: 'localhost',
          dialect: 'mysql',
          port: 3306
        }
    )
)

module.exports = connection