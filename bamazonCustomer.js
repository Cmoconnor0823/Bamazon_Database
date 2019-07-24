//First input npm requirements then connect to the mySQL database

var mysql = require("mysql");
//var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",

    port:3306,

    user:"root",

    password: "Stitch626",
    database: "bamazon_schema"
});


connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });

    //first begin by displaying inventory items from bamazon database
    // show the item's id, the name and then the price
function displayItems() {
  connection.query("Select item_id, product_name, price From products", function(err, res) {
    if (err) throw err;

    console.log(res);
    connection.end();
  });
}
  //begin run  inquirer questions use last  in class activity for example

  //will need to first ask user what product they would like--by name but reference by unique id
  //use a switch case for both sets of questions????

  // then ask user how much of the item they would like
  // now deduct the user's chosen items from the inventory
  //
  // create a of out of stock back up error 

  //once item is deducted from the inventory display item shipped and total cost