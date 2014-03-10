INSERT INTO Account(email, password, firstname, lastname, createdby_id, lastmodifiedby_id, createddate, lastmodifieddate) VALUES ('system@example.com', 'password', 'System', 'User', 1, 1, '2014-01-01', '2014-01-01');
Set @SystemAccountId = IDENTITY();
INSERT INTO Account(email, password, firstname, lastname, createdby_id, lastmodifiedby_id, createddate, lastmodifieddate) VALUES ('test@example.com', 'password', 'Test', 'User', 1, 1, '2014-01-01', '2014-01-01');
SET @TestAccountId = IDENTITY();