-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  hashedpassword VARCHAR(90) NOT NULL,
  profilePic VARCHAR(60) NOT NULL,
  username VARCHAR(55) NOT NULL, 
  PRIMARY KEY(id)
);


ALTER TABLE users ADD username VARCHAR(55) NOT NULL;







CREATE TABLE favsshow (
  id INT(20) NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  media_type VARCHAR(10) NOT NULL,
  media_id INT NOT NULL,
  PRIMARY KEY (id),
  showname VARCHAR(55) NOT NULL,
  backdrop VARCHAR(55) NOT NULL,
  duration VARCHAR(55) NOT NULL,
  poster VARCHAR(55) NOT NULL,
  score FLOAT(20) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
ALTER TABLE favsshow ADD poster VARCHAR(55) NOT NULL;
ALTER TABLE favsshow ADD CONSTRAINT unique_Media_id UNIQUE (media_id);
ALTER TABLE favsshow DROP INDEX unique_Media_id;
