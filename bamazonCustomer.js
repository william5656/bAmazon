var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon_db"

});

connection.connect(function(err) {
    if (err){
        throw err;
    }
    console.log("connected as id" + connection.threadId + + "\n");
    readProducts();
});

function readProducts() {
    console.log(`\n===================\n`)
    connection.query("SELECT * FROM products", function(err, res){
        if (err){
            throw (err);
        }
        console.log(JSON.stringify(res, null, 2));
        placeOrder();
    })
}

function placeOrder() {
    
}