INSERT INTO account (id, email, password, firstname, lastname, createdby_id, lastmodifiedby_id, createddate, lastmodifieddate) VALUES
(1, 'test@example.com', '$2a$10$Svaso0lrPu/bJ7jfdDqRT.5ury2MDbPa4XfrAKJj.yZM/BG8a1Sdq', 'Test', 'User', 1, 1, '2014-01-01', '2014-01-01');

INSERT INTO account_authority (account_id, authority) VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER');
