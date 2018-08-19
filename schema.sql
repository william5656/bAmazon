DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("keyboard", "Tech", 25.25, 120),
        ("lamp", "furniture", 10.25, 100), 
        ("chair", "furniture", 30.00, 40), 
        ("table", "furniture", 115.99, 40), 
        ("mouse", "Tech", 15.99, 30),
        ("ps4", "Tech", 500.00, 20), 
        ("16 GB USB", "Tech", 22.99, 20), 
        ("sticky notes", "paper", 2.55, 100), 
        ("cutting board", "kitchen", 10.25, 60), 
        ("painting", "art", 200.00, 5);

use bamazon_db;

show tables;


select	 *
from products;