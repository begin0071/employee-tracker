 DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (id, names)
VALUES (1, "Seafood");
INSERT INTO department (id, names)
VALUES (2, "Kosher");
INSERT INTO department (id, names)
VALUES (3, "Nuts");

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Food Handler", 45000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Kosher Distribution", 50000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Nuts Delivery", 75000, 3);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES role(id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mugees", "Khaki", 3, NULL);