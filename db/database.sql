-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  lastname VARCHAR(45) DEFAULT NULL,
  email VARCHAR(45) DEFAULT NULL,
  password VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY(id)
);

DESCRIBE user;

INSERT INTO user values 
  (1, 'Ryan', 'Ray', 'Ryan@gmail.com', '123456a'),
  (2, 'Joe', 'McMillan', 'Joe@gmail.com', '123456a'),
  (3, 'John', 'Carter', 'John@gmail.com', '123456a');

SELECT * FROM user;




CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(9) DEFAULT NULL,
  PRIMARY KEY(id)
);


INSERT INTO employee values 
  (1, 'Ryan Ray', 5600),
  (2, 'Joe McMillan', 7800),
  (3, 'John Carter', 1200);

SELECT * FROM employee;