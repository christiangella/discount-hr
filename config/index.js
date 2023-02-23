const connection = require('./connection')

class DATABASE {
    constructor(connection) {
        this.connection = connection;
      }

    viewDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        )
    }

    viewRoles() {
        return this.connection.promise().query(
            'SELECT * FROM role'
        )
    }

    viewEmployees() {
        return this.connection.promise().query(
            'SELECT * FROM employee'
        )
    }

    addDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department
        )
    }

    addRole(role) {
        return this.connection.promise().query(
            'INSERT into role SET ?', role
        )
    }

    addEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        )
    }

    updateEmployee(employee_id, role_id) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]
        )
    }
}

module.exports = new DATABASE(connection)