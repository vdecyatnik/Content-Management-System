const connection = require("./connection");

//interactions with mysql

module.exports = {
  getDepartments() {
    return connection.query(`SELECT name
                             FROM department`);
  },

  getRoles() {
    return connection.query(`SELECT title, salary 
                              FROM role`);
  },

  getEmployees() {
    return connection.query(`SELECT e.first_name, 
                            e.last_name,
                            r.title,
                            CONCAT(e2.first_name, " ", e2.last_name) AS "manager name"
                             FROM employee AS e
                             LEFT JOIN role AS r
                             ON e.role_id = r.id
                             LEFT JOIN employee AS e2
                             ON e.manager_id = e2.id`);
  },

  // insertRole( data ) {
  //     return connection.query( );//complete this query
  // }

  
};
