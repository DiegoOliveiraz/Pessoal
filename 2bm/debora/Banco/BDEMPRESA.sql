create database BDEMPRESA;
use BDEMPRESA;

create table Empresas
(
	CNPJ int primary key,
	Nome_empr varchar(100) not null
);

create table Departamentos 
(
    Cod_dep int primary key,
    Nome_dep varchar(64) not null,
    CNPJ int not null,            
    constraint FK_Empresas_Departamentos
        foreign key (CNPJ) references Empresas(CNPJ)
);

create table Funcionarios
(
	Matricula int primary key,
	Nome_fun varchar(200) not null,
	Cod_dep int not null,
	constraint FK_Departamentos_Funcionarios
		foreign key (Cod_dep) references Departamentos(Cod_dep)
);

create table clientes
(
	Cod_client int primary key,
	Nome_client varchar(200) not null
);

create table Materiais
(
Codigo_material int primary key,
Nome_material varchar(100)not null
);

CREATE TABLE Departamento
(
    Codigo_Departamento INT PRIMARY KEY,
    Nome_Departamento VARCHAR(100) NOT NULL
);

CREATE TABLE Producoes
(
    Codigo_Departamento INT NOT NULL,
    Codigo_Material INT NOT NULL,
    CONSTRAINT PK_Producoes PRIMARY KEY (Codigo_Departamento, Codigo_Material),
    CONSTRAINT FK_Producoes_Departamento FOREIGN KEY (Codigo_Departamento)
        REFERENCES Departamento(Codigo_Departamento),
    CONSTRAINT FK_Producoes_Materiais FOREIGN KEY (Codigo_Material)
        REFERENCES Materiais(Codigo_Material)
);

CREATE TABLE Cliente
(
    Codigo_Cliente INT PRIMARY KEY,
    Nome_Cliente VARCHAR(100) NOT NULL
);

CREATE TABLE Compras
(
    Codigo_Material INT NOT NULL,
    Codigo_Cliente INT NOT NULL,
    CONSTRAINT PK_Compras PRIMARY KEY (Codigo_Material, Codigo_Cliente),
    CONSTRAINT FK_Compras_Materiais FOREIGN KEY (Codigo_Material)
        REFERENCES Materiais(Codigo_Material),
    CONSTRAINT FK_Compras_Cliente FOREIGN KEY (Codigo_Cliente)
        REFERENCES Cliente(Codigo_Cliente)
);