const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayAll();
});

function displayAll() {
    connection.query({
        sql: 'SELECT * FROM products'
    }, function(err, res) {
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                    " || Product: " + res[i].product_name +
                    " || Department: " + res[i].department_name +
                    " || Price: " + res[i].price +
                    " || Stock: " + res[i].stock_quantity
                    );
        }
        runSearch();
    });
}

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Select item by ID",
                "Display products",
                "Exit"
            ]
        })
    .then(function(answer) {
        switch (answer.action) {
            case "Select item by ID":
                idSearch();
                break;
            case "Display products":
                displayAll();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                break;
        }
    });
}

function idSearch() {
    inquirer
        .prompt([{
            name: "item_id",
            type: "input",
            validate: validatePositiveInt,
            message: "Input product ID: "
        }, {
            name: 'stock_quantity',
            type: 'input',
            validate: validatePositiveInt,
            message: 'Input the number you wish to purchase: '
        }])
    .then(function(answer) {
        const query = "SELECT * FROM products WHERE ?";
        connection.query({
            sql: query,
            values: { item_id: answer.item_id }
        }, function(err, res) {
            if (err) {
                throw err;
            }
            if (res.length) {
                if(answer.stock_quantity > res[0].stock_quantity) {
                    console.log('Insufficient quantity!');
                } else {
                    let updatedStock = res[0].stock_quantity - answer.stock_quantity;
                    connection.query({
                        sql: 'UPDATE products SET ? WHERE ?',
                        values: [{stock_quantity: updatedStock}, {item_id: answer.item_id}]
                    }, function(err) {
                        if (err) throw err;
                    });
                    let total = res[0].price * answer.stock_quantity;
                    console.log('Total: $' + parseFloat(total).toFixed(2));
                }
            } else {
                console.log('ID not found.');
            }
            runSearch();
        });
    });
}

function validatePositiveInt(inputValue) {
    if (Number.isInteger(parseFloat(inputValue)) && parseFloat(inputValue) >= 0) {
        return true;
    } else {
        console.log('\nInput value is not a positive whole number.');
        return false;
    }
}
