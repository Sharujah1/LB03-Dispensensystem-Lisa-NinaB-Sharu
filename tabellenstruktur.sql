
CREATE DATABASE dispensen;

SHOW databases;

USE dispensen;

CREATE TABLE person (
                        person_id INT PRIMARY KEY AUTO_INCREMENT,
                        first_name VARCHAR(50),
                        last_name VARCHAR(50),
                        birth_date DATE,
                        phone_number CHAR(16),
                        email_address VARCHAR(100),
                        password VARCHAR(64)
);

CREATE TABLE dispensation (
                              dispens_id INT PRIMARY KEY AUTO_INCREMENT,
                              person_id INT,
                              status_id INT,
                              date_from DATE,
                              date_til DATE,
                              subject VARCHAR(30),
                              reason VARCHAR(100),
                              comments VARCHAR(100)
);

CREATE TABLE status (
                        status_id INT PRIMARY KEY AUTO_INCREMENT,
                        status_text VARCHAR(50)
);