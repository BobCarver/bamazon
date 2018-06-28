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

function promptList(){
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    }
    ).then(function(response) {
    if (response.option === "View Products for Sale"){
        return forSale()
    }
    else if (response.option === "View Low Inventory"){
        return lowInventory()
    }
    else if (response.option === "Add to Inventory"){
        return addInventory()
    }
    else if (response.option === "Add New Product"){
        return newProduct()
    }

})
}
//prompts the manager questions
promptList();

//function for showing everything thats for sale
function forSale() {
	// Construct the database query string
	queryStr = "SELECT * FROM products";
	// Make the database query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;
		console.log("Existing Inventory: ");
		console.log("...................\n");
		var strOut = "";
		for (var i = 0; i < data.length; i++) {
            strOut = `Item ID: ${data[i].item_id} | Product Name: ${data[i].product_name} | Department: ${data[i].department_name} | Price: ${data[i].price} | Quantity: ${data[i].stock_quantity}\n`
			console.log(strOut);
		}
	})
}

function lowInventory(){
    queryStr = "SELECT * FROM products";

    connection.query(queryStr, function(err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++){
            //logs all items with quantity less than 5
            if (data[i].stock_quantity < 5){
                strOut = `Item ID: ${data[i].item_id} | Product Name: ${data[i].product_name} | Department: ${data[i].department_name} | Price: ${data[i].price} | Quantity: ${data[i].stock_quantity}\n`
			    console.log(strOut);
            }
        }
    })
}


//this does not work at all at the moment
function addInventory(){
    inquirer.prompt([
        {
            type: "input",
            message: "What item ID would you like to add more of?",
            name: "item_id",
            filter: Number
        },

        {
            type: "input",
            message: "How many would you like to add?",
            name: "stock_quantity",
            filter: Number
        }
    ]).then(function(input){
        var queryStr = "UPDATE products SET stock_quantity";
        console.log(queryStr)
            //help
             
    })

}

//adds a new product
function newProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What product would you like to add?"
        },
        {
            type: "input",
            name: "department_name",
            message: "What department does this product belong to?"
        },
        {
            type: "input",
            name: "price",
            message: "What much does this produt cost per unit?"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many units of this product are you adding?"
        }
    ]).then(function(input){
        var queryStr = 'INSERT INTO products SET ?';

		// Add new product to the db
		connection.query(queryStr, input, function (err, results, fields) {
			if (err) throw err;
            //console logs message with most recently inserted ID
			console.log(`New product has been added to the inventory under Item ID ${results.insertId}.`);
        })
    }
    )
}

