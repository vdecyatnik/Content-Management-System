const connection = require("./connection");

//interactions with mysql

module.exports = {
  getDepartments() {
    return connection.query(`SELECT *
                             FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT 
                              r.id,
                              r.title,
                              r.salary,
                              d.name,
                              d.id AS department_id FROM role AS r
                              LEFT JOIN department AS d ON r.department_id= d.id`);
  },

  getEmployees() {
    return connection.query(`SELECT e.id,e.first_name, 
                            e.last_name,
                            r.title,r.salary,d.name,
                            CONCAT(e2.first_name, " ", e2.last_name) AS "manager_name"
                             FROM employee AS e
                             LEFT JOIN role AS r
                             ON e.role_id = r.id
                             LEFT JOIN employee AS e2
                             ON e.manager_id = e2.id
                             INNER JOIN department AS d ON r.department_id=d.id
                            
                            

                            

                             `);
  },

  employeeUpdate(data) {
    return connection.query("UPDATE employee SET ? WHERE ?", [
      {
        role_id: data.role_id,
      },
      {
        id: data.id,
      },
    ]);
  },

  deleteDepartment(data) {
    return connection.query("DELETE FROM department WHERE ?", data);
  },

  deleteRole(data) {
    return connection.query("DELETE FROM role WHERE ?", data);
  },

  deleteEmployee(data) {
    return connection.query("DELETE FROM employee WHERE ?", data);
  },
};
