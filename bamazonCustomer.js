//First input npm requirements then connect to the mySQL database

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  
  port: 3306,
  
  user: "root",
  
  password: "",
  database: "bamazon_schema"
});

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);


  if (integer && (sign === 1)) {
    return true;
  } else {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
    console.log ('Error: Please input a non negative item quantity number to order.');
    
    ///some how the program needs to restart here
    runBamazonDB();
  }
}

connection.connect(function (err) {
  if (err) throw err;
  //runBamazonDB();
});

function runBamazonDB() {
  console.log('~._.~"~._.~"~._.~Welcome to Bamazon~._.~"~._.~"~._.~')
  displayItems();
}

// display inventory items from bamazon database
// show the item's id, the name and then the price
function displayItems() {
  
  //Create the database query quantity string
  queryQuantity = "Select * From products";
  //now make the query
  connection.query(queryQuantity, function (err, data) {
    if (err) throw err;
    console.log("Current Inventory:  ");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
    
    var queryOutput = "";
    for (var i = 0; i < data.length; i++) {
      queryOutput = "";
      queryOutput += "Item ID: " + data[i].item_id + " | ";
      queryOutput += "Item Name: " + data[i].product_name + " | ";
      queryOutput += "Department: " + data[i].department_name + " | ";
      queryOutput += "Price: $" + data[i].price + "\n";
      console.log(queryOutput);
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    promptBuy();
  });
}

//begin run  inquirer questions use last  in class activity (great bay) for example
function promptBuy() {
  //console.log("~entered purchase function~");
  
  //will need to first ask user what product they would like--by name but reference by unique id
  //use a switch case for both sets of questions????
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "Welcome to Bamazon's new ordering system!" + " Please enter the ID Number of the item you wish to purchase.",
      validate: validateInput,
      filter: Number
    },
    // then ask user how much of the item they would like
    //is there a way to set the default to one?
    {
      type: "input",
      name: "quantity",
      message: "Now please select the quantity of the item you would like to order.",
      validate: validateInput,
      filter: Number
    }
  ]).then(function (input) {
    //is there a way to show the name instead of the item's id?
    console.log('You have selected: \n    Selected Item id # = ' + input.item_id + '\n    quantity = ' + input.quantity);
    
    var item = input.item_id;
    var quantity = input.quantity;
    //first validate the quantity with the db to ensure the order can be filled
    var queryQuantity = "Select * from Products where ?";
    
    connection.query(queryQuantity, { item_id: item }, function (err, data) {
      if (err) throw err;
      
      //create error condition for invalid id input
      if (data.length === 0) {
        console.log("An Error occured. Invalid Item Id. Please select a valid Item ID Number.");
        displayItems();
      } else {
        var productData = data[0]
        
        //console.log('productData = ' + JSON.stringify(productData));
        //	console.log('productData.stock_quantity = ' + productData.stock_quantity);
        
        // If the quantity requested by the user is in stock
        if (quantity <= productData.stock_quantity) {
          console.log("Congratulations, the Item you requested is in stock! Placing order...")
          
          // now deduct the user's chosen items from the inventory
          //

          //how do i hide this function from the terminal
          // Create the update stock function
          var updateQueryQuantity = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
           //console.log('updateQueryQuantity = ' + updateQueryQuantity);
          
          // Update the inventory
          connection.query(updateQueryQuantity, function (err, data) {
            if (err) throw err;
            
            //once item is deducted from the inventory display item shipped and total cost
            console.log('Your order has been placed! Your total is $' + productData.price * quantity);
            console.log('Thank you for shopping at Bamazon_db!');
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            
            
            ////instead of end cpnnectipm here can i ask the user if they
            //want to place a second order
            // End the database connection
            //connection.end();
            repromptUser();
            
          })
          // create a of out of stock back up error 
        } else {
          console.log('Sorry, there is not enough of that item in stock, your order can not be placed.');
          console.log('Please re-select your order.');
          console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
          
          displayItems();
        }
      }
    })
  })
}

//asks if they would like to purchase another item
function repromptUser(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      runBamazonDB();
    } else{
      console.log("See you again soon! Thank you for choosing Bamazon!");
      connection.end();
    }
  });
}
runBamazonDB();