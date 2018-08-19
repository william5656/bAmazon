var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');

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
    connection.query("SELECT id, product_name, price FROM products", function(err, res){
        if (err){
            throw (err);
        }
            console.table(res);
        // console.log(JSON.stringify(res, null, 2));
        // connection.end();
        placeOrder();
    })
}

function placeOrder() {

    inquirer.prompt([
        {
            type: "input",
            message: "What would you like to buy?\n please enter the ID\n",
            name: "product",
            validate: function(input){
                var done = this.async();
                connection.query("SELECT id FROM products", function(err, res){
                    if (!Number.isInteger(parseFloat(input)) || parseInt(input) > res.length) {
                        done('\n\nYou need to provide a vaild number\n');
                        return;
                        }
                        else{
                            done(null, true);
                        }
                })
            } 
        },
        {
            type: "input",
            message: "How much would you like to buy\n",
            name: "amount",
            validate: function(input){
                var done = this.async();
                connection.query("SELECT id FROM products", function(err, res){
                    if (!Number.isInteger(parseFloat(input))) {
                        done('\n\nYou need to provide a vaild number\n');
                        return;
                        }
                        else{
                            done(null, true);
                        }
                })
            } 
        }

    ]).then(answer =>{
        var newOrder;

        setTimeout(order, 1000);
        
        function order(){

        console.log(`\n=================\n`);
        console.log(`Making purchase for\n`);
        connection.query("SELECT product_name FROM products WHERE id= "+ answer.product +" ", function(err, res) {
            if (err) {
                throw err;
            }
            console.log(JSON.stringify(res[0].product_name, null, 2));
        
            setTimeout(() => {
                orderAmount()
            }, 1000);;
          });
        }

        function orderAmount(){
            console.log(`\n----------------\nAmount:${answer.amount}`);
            console.log(`\n=================\n`)
            checkProducts();
        }
        
        function checkProducts(){
            connection.query("SELECT stock_quantity FROM products WHERE id= "+ answer.product + " ", function(err, res) {
                if (err) {
                    throw err;
                }
                if(parseInt(answer.amount) > res[0].stock_quantity){
                    console.log("Exceeded Max Amount of products")
                    setTimeout(() => {
                        placeOrder();
                    }, 1000);
                }
                 else{
                      newOrder = res[0].stock_quantity - parseInt(answer.amount);
                      makePurchase();
                 }
            });
        }

        function makePurchase(){
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newOrder
                  },
                  {
                    id: parseInt(answer.product)
                  }
                ],
                function(error) {
                  if (error) {
                      throw err;
                  }
                  setTimeout(() => {
                    console.log("your purchase has been successfully Completed!");
                    readProducts2();
                  }, 1000);
                }
              );
        }

        function readProducts2() {
            console.log(`\n===================\n`)
            connection.query("SELECT price FROM products WHERE id="+ answer.product +"", function(err, res){
                if (err){
                    throw (err);
                }
                var cost = JSON.stringify(res[0].price, null, 2)
                var total = parseInt(cost) * parseInt(answer.amount);

                console.log(`You total is: $${total}`);
                // connection.end();
                setTimeout(() => {
                    stockLeft();
                }, 2000); 
               
            })
        }

        function stockLeft() {
            console.log(`\n\n===================================================================\n`);
            console.log("Products left in stock")
            connection.query("SELECT * FROM products", function(err, res){
                if (err){
                    throw (err);
                }
                console.table(res);
                // connection.end();
                connection.end();
            })
        }
    });
}