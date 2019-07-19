use  bamazon_schema;
Drop table if exists products;
CREATE TABLE products(
item_id int auto_increment primary key not null,
product_name VARCHAR(500) Not Null,
department_name Varchar(500) not null,
price decimal(10,2),
stock_quantity int(255)
);
use  bamazon_schema;
 select * from products;
 
 Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Tissues","home", 3.99, 100);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Paper Towels","home", 4.99, 200);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Dry Pasta","pantry", 0.99, 150);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Canned Soup","pantry", 1.99, 170);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Blank CD's","electronics", 7.95, 75);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Mouse Pad-Green","electronics", 2.99, 50);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Mouse Pad-Red","electronics", 2.99, 50);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Potting Soil","outdoor", 3.99, 100);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("10'in Table-top Grill","outdoor", 15.65, 100);
 
  Insert into products (product_name, department_name, price, stock_quantity)
 values
 ("Light Bulbs - 3 count","home", 7.05, 160);
 
 
select * from products;