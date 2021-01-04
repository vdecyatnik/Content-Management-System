const inquirer = require("inquirer");

const db = require("./db");
const connection = require("./db/connection");

function startApp() {
  inquirer
    .prompt({
      message: "What would you like to do?",
      name: "action",
      type: "list",
      choices: [
        "VIEW_DEPARTMENTS",
        "VIEW_ROLES",
        "VIEW_EMPLOYEES",
        "CREATE_ROLE",
        "ADD_DEPARTMENT",
        "CREATE_EMPLOYEE",
        "QUIT",
      ],
    })
    .then((res) => {
      switch (res.action) {
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          return;

        case "VIEW_ROLES":
          viewRoles();
          return;

        case "VIEW_EMPLOYEES":
          viewEmployees();
          return;

        case "CREATE_ROLE":
          createRole();
          return;

        case "ADD_DEPARTMENT":
          createDepartment();
          return;

        case "CREATE_EMPLOYEE":
          createEmployee();
          return;

        case "QUIT":
          endApp();
      }
    });
}

function viewDepartments() {
  db.getDepartments().then((results) => {
    console.table(results);
    startApp();
  });
}

function viewRoles() {
  db.getRoles().then((results) => {
    console.table(results);
    startApp();
  });
}

function viewEmployees() {
  db.getEmployees().then((results) => {
    console.table(results);
    startApp();
  });
}

function endApp() {
  connection.end();
}

function createRole() {
  db.getDepartments().then((departments) => {
    const departmentChoices = departments.map((department) => ({
      value: department.id,
      name: department.name,
    }));

    console.log(
      departments.map((department) => ({
        value: department.id,
        name: department.name,
      }))
    );

    inquirer
      .prompt([
        {
          message: "What department is this role for?",
          type: "list",
          name: "department_id",
          choices: departmentChoices,
        },

        {
          message: "What is the roles you would like to add?",
          type: "input",
          name: "rolename",
        },
        {
          message: "What is the salary for this role?",
          type: "input",
          name: "rolesalary",
        },
      ])
      .then((res) => {
        //console.log(res);

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.rolename,
            salary: res.rolesalary,
          },
          function (err) {
            if (err) throw err;
            console.log("Role has been added");
            console.table(res);
            startApp();
          }
        );
      });
  });
}

function createDepartment() {
  inquirer
    .prompt([
      {
        message: "What is the name of the department you would like to add",
        type: "input",
        name: "newDept",
      },
    ])
    .then((res) => {
      //console.log(res);

      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.newDept,
        },
        function (err) {
          if (err) throw err;
          console.log("Department has been added");
          console.table(res);
          startApp();
        }
      );
    });
}

function createEmployee() {
  db.getRoles().then((roles) => {
    console.log(roles);
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.department_id,
    }));

    console.log(
      roles.map((role) => ({
        name: role.title,
        value: role.department_id,
      }))
    );

    db.getEmployees().then((employees) => {
      console.log(employees);
      const managerChoices = employees.map((employee) => ({
         value: employee.id,
        name: employee.first_name + " " + employee.last_name,
      }));

      console.log(
        employees.map((employee) => ({
          value: employee.id,
          name: employee.first_name + " " + employee.last_name,
        }))
      );

      inquirer
        .prompt([
          {
            message: "Enter first name of new employee",
            type: "input",
            name: "firstname",
          },
          {
            message: "Enter last name of new employee",
            type: "input",
            name: "lastname",
          },
          {
            message: "What is the new employees role?",
            type: "list",
            name: "newemployeerole",
            choices: roleChoices,
          },
          {
            message: "Who is the employees manager?",
            type: "list",
            name: "employeemanager",
            choices: managerChoices,
          },
        ])
        .then((res) => {
          console.log(res);

          connection.query(
            "INSERT INTO employee SET ? ",
            {
              first_name: res.firstname,
              last_name: res.lastname,
              role_id: res.newemployeerole,
              manager_id: res.employeemanager
              

              //managerid
            },
            function (err) {
              if (err) throw err;
              console.log("Employee has been added");
              console.table(res);
              startApp();
            }
          );
        });
    });
  });
}
startApp();
