CREATE DATABASE BDGAMES
USE BDGAMES
CREATE TABLE USUARIO (
	id int primary key identity,
	email varchar(100) not null unique,
	senha varchar(20) not null,
	acesso varchar(5) not null --check(acesso='admin' or acesso='user')
)