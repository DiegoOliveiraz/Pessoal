create database BDCliente 
use BDCliente 

create table Clientes 
(cod int not null primary key, 
nome varchar(50), 
rua varchar (100), 
num char (10), 
bairro varchar (100), 
cidade varchar (100), 
estado char(2), 
salario money, 
idade smallint) 

sp_help Clientes 







