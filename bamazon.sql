DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(50) NOT NULL,
stock_quantity INTEGER (20),
PRIMARY KEY (item_id));

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Socks", "Apparel", 5, 6),
("Slippers", "Apparel", 20, 10),
("Towels", "Bath", 30, 5),
("Cheezy Poofs", "Grocery", 10, 20),
("Aladdin", "Movies", 25, 14),
("Zelda", "Video Games", 45, 10),
("Sunglasses", "Apparel", 7, 15),
("The Big Lebowski", "Movies", 15, 20),
("Shampoo", "Bath", 8, 17),
("Bubble Bath", "Bath", 4, 9);