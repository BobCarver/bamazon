var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "root",
	database: "bamazon"
});

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: "input",
			name: "item_id",
			message: "Please enter the Item ID for your desired purchase.",
			filter: Number
		},
		{
			type: "input",
			name: "quantity",
			message: "How many of this item would you like to order?",
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = "SELECT * FROM products WHERE ?";

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log("Not a valid ID! Try again with a different ID.");
			    showInventory();

			} else {
				var productData = data[0];


				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log("Congratulations, the product you requested is in stock! Processing...");

					// Construct the updating query string
                    var updateQueryStr = `UPDATE products SET stock_quantity = ${productData.stock_quantity - quantity} WHERE item_id = ${item}`;


					// Inventory update
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log(`Your oder has been placed! Your total is $${productData.price * quantity}`);
                        // End the database connection
                        // showInventory();
                        
						connection.end();
					})
				} else {
					console.log("We don't have enough in stock to complete your order! Try again");

					showInventory();
				}
			}
		})
	})
}

// showInventory grabs db info and prints it to console
function showInventory() {

	// Construct the db query string
	queryStr = "SELECT * FROM products";

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log("Existing Inventory: ");
		console.log("...................\n");

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
            strOut = `Item ID: ${data[i].item_id} | Product Name: ${data[i].product_name} | Department: ${data[i].department_name} | Price: ${data[i].price} | Quantity: ${data[i].stock_quantity}\n`
			// strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			// strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			// strOut += 'Department: ' + data[i].department_name + '  //  ';
			// strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}

function runBamazon() {

	// Display the available inventory
	showInventory();
}

runBamazon();