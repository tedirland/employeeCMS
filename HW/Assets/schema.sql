DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;

CREATE TABLE department(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL (20),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER (10),
  manager_id INTEGER (10),
  PRIMARY KEY (id)
);