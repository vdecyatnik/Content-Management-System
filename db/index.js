const connection = require("./connection");

//interactions with mysql

module.exports = {
  getDepartments() {
    return connection.query(`SELECT name
                             FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT title, salary, department_id
                              FROM role`);
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

  // insertRole( data ) {
  //     return connection.query( );//complete this query
  // }

  
};
