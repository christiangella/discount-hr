const mysql = require('mysql2')
//require('dotenv').config()

const connection = mysql.createConnection ({
    //new Sequelize (
        //process.env.DB_NAME,
        //process.env.DB_USER,
        //process.env.DB_PASSWORD,
        //{
          host: 'localhost',
          user: 'root',
          database: 'employees_db'
          //dialect: 'mysql',
          //port: 3306
        //}
}
    )
//)

connection.connect(function(err) {
  if (err) throw err
})

module.exports = connection