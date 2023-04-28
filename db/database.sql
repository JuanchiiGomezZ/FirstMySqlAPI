-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;
RENAME TABLE users TO users_vieja;
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  hashedpassword VARCHAR(90) NOT NULL,
  profilePic VARCHAR(60) NOT NULL
  PRIMARY KEY(id)
);



INSERT INTO users values 
  (1, 'Ryan', 'Ray', 'Ryan@gmail.com', '123456a'),
  (2, 'Joe', 'McMillan', 'Joe@gmail.com', '123456a'),
  (3, 'John', 'Carter', 'John@gmail.com', '123456a');

SELECT * FROM user;




CREATE TABLE favsShow (
  id INT(20) NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  media_type VARCHAR(10) NOT NULL,
  media_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
