-- DROP DATABASE IF EXISTS employeetracker_DB;
-- CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

-- CREATE TABLE department(
-- id INT NOT NULL AUTO_INCREMENT,
-- name VARCHAR(255) NOT NULL,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE role(
-- id INT NOT NULL auto_increment,
-- title VARCHAR(255) NOT NULL,
-- salary DECIMAL NOT NULL,
-- department_id INT NOT NULL,
-- PRIMARY KEY (id),
-- FOREIGN KEY (department_id) REFERENCES department (id)

-- );

-- CREATE TABLE employees(
-- id INT NOT NULL auto_increment,
-- first_name VARCHAR(255) NOT NULL,
-- last_name VARCHAR(255) NOT NULL,
-- role_id INT NOT NULL,
-- manager_id INT,
-- PRIMARY KEY (id),
-- FOREIGN KEY (role_id) REFERENCES role (id)
-- );

-- INSERT INTO department VALUES ( 1, "Art");
-- INSERT INTO department VALUES (2, "Sales");

-- insert into role VALUES(1, "Graphic Designer", 53000,1);
-- insert into role VALUES(2, "Art Director", 153000,1);
-- insert into role VALUES(3, "Sales Rep", 75000,2);

-- insert into employees VALUES(1, "Taylour","Maggart", 1,1);
-- insert into employees (id, first_name, last_name, role_id) VALUES(2, "Jason","Norton", 2);
-- insert into employees VALUES(3, "Ryan","McDonald", 3,1);

SELECT * FROM employees


;


