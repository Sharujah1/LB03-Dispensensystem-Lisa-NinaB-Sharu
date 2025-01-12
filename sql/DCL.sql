CREATE USER 'server'@'localhost' identified by '1234';

GRANT INSERT, UPDATE, DELETE, SELECT on dispensen.* to 'server'@'localhost';

SHOW GRANTS FOR 'server'@'localhost';