DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect favorite_db --
USE bamazon;

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL UNIQUE,
  department_name VARCHAR(50) DEFAULT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) DEFAULT 0,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ice Cream', 'Frozen Snacks', 3.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gelato', 'Frozen Snacks', 3.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pudding', 'Frozen Snacks', 2.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tomato', 'Produce', 0.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cucumber', 'Produce', 0.40, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bell Pepper', 'Produce', 0.80, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Celery', 'Produce', 0.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Beef Stew', 'Canned Foods', 2.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Baked Beans', 'Canned Foods', 1.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Apple', 'Fruit', 1.20, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Banana', 'Fruit', 0.70, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Orange', 'Fruit', 1.00, 30);