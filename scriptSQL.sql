drop database  if exists gestionProduit;
create database gestionProduit;
use gestionProduit;

drop table if exists Produit;
create table Produit(
	id int(10) primary key auto_increment,
	description varchar(50),
	image varchar(30),
	prix decimal(10,2),
	details varchar(200)
);

insert into Produit values
	(null, "HP portatif", "portable1.jpg", 350.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Pro MF839LA", "portable2.jpg", 1549.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Air MJVE2C", "portable3.jpg", 1990.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "MSI Portatif de jeu Leopard", "portable4.jpg", 1099.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "HP portatif 001", "portable1.jpg", 350.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Pro MF839LA 001", "portable2.jpg", 1549.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Air MJVE2C 001", "portable3.jpg", 1990.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "MSI Portatif de jeu Leopard 001", "portable4.jpg", 1099.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "HP portatif 002", "portable1.jpg", 350.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Pro MF839LA 002", "portable2.jpg", 1549.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Air MJVE2C 002", "portable3.jpg", 1990.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "MSI Portatif de jeu Leopard 002", "portable4.jpg", 1099.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "HP portatif 003", "portable1.jpg", 350.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Pro MF839LA 003", "portable2.jpg", 1549.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "Portatif Macbook Air MJVE2C 003", "portable3.jpg", 1990.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir"),
	(null, "MSI Portatif de jeu Leopard 003", "portable4.jpg", 1099.95, "MSI 15.6 po GF65 9SEXR-436p, Intel Core i7-9750H, 16GB RAM, 512GB SSD, Win10, Noir");
