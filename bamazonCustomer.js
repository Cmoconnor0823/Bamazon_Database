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
  console.log("~entered purchase function~");
  
  //will need to first ask user what product they would like--by name but reference by unique id
  //use a switch case for both sets of questions????
inquirer.prompt([
  {
    type: "input",
    name: "item_id",
    message: "Welcome to Bamazon!" + " Please enter the ID Number of the item you wish to purchase.",
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
]).then(function(input) {
  console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

  var item = input.item_id;
  var quantity = input.quantity;
  //first validate the quantity with the db to ensure the order can be filled
  var queryQuantity = "Select * from Products where ?";

  connection.query(queryQuantity, {item_id: item}, function(err, data) {
    if (err) throw err;

    //create error condition for invalid id input
    if (data.length === 0){
      console.log("An Error occured. Invalid Item Id. Please select a valid Item ID Number.");
      displayItems();
    } else {
      var productData = data[0]

       console.log('productData = ' + JSON.stringify(productData));
				console.log('productData.stock_quantity = ' + productData.stock_quantity);

        // If the quantity requested by the user is in stock
        if (quantity <= productData.stock_quantity) {
          console.log("Congratulations, the Item you requested is in stock! Placing order...")
       
          // now deduct the user's chosen items from the inventory
          //
          // Create the update stock function
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);
       
       
        }
    }
  })
})
}

  // create a of out of stock back up error 

  //once item is deducted from the inventory display item shipped and total cost