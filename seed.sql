DROP DATABASE IF EXISTS
employees_db;

CREATE DATABASE 
employees_db;

USE
employees_db;

CREATE TABLE  department (
    id INT  AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT  AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT ,
    PRIMARY KEY (id),
    FOREIGN KEY role(department_id) REFERENCES department(id)
   
  

);



CREATE TABLE employee(

    id INT  AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT ,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
   

);
INSERT INTO department (name)
VALUES ("sales"),("marketing");




INSERT INTO role (title,salary, department_id)
VALUES ("lead sales", 800.00, 1),("graphic designer", 9000.0, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Valentina", "Decyatnik", 1,1 ), ("Dellie", "Decyatnik",2 , 2);
