//First input npm requirements then connect to the mySQL database

var mysql = require("mysql");
var inquirer = require("inquirer");

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
    promptBuy();
  });
}
//begin run  inquirer questions use last  in class activity (great bay) for example
function promptBuy() {
  console.log("entered purchase function");
  
  //will need to first ask user what product they would like--by name but reference by unique id
  //use a switch case for both sets of questions????
inquirer.prompt([
  {
    type: "input",
    name: "item_id",
    message: "Please enter the ID Number of the item you wish to purchase.",
    filter: Number
  },
  // then ask user how much of the item they would like
  //is there a way to set the default to one?
  {
    type: "input",
    name: "quantity",
message: "Now please select the quantity of the item you would like to order.",
filter: Number
  }
])
}

  // now deduct the user's chosen items from the inventory
  //
  // create a of out of stock back up error 

  //once item is deducted from the inventory display item shipped and total cost