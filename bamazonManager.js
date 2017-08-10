var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    whatDo();
});

function whatDo() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Remove Existing Product',
                "Exit"
            ]
        })
    .then(function(answer) {
        switch (answer.action) {
            case 'View Products for Sale':
                displayAll();
                break;
            case 'View Low Inventory':
                displayLow();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'Remove Existing Product':
                removeProduct();
                break;
            default:
                connection.end();
                break;
        }
    });
}

function displayAll() {
    connection.query({
        sql: 'SELECT * FROM products'
    }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                    " || Product: " + res[i].product_name +
                    " || Department: " + res[i].department_name +
                    " || Price: " + res[i].price +
                    " || Stock: " + res[i].stock_quantity
                    );
        }
        whatDo();
    });
}

function displayLow() {
    connection.query({
        sql: 'SELECT * FROM products WHERE stock_quantity < ?',
        values: [5]
    }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                    " || Product: " + res[i].product_name +
                    " || Department: " + res[i].department_name +
                    " || Price: " + res[i].price +
                    " || Stock: " + res[i].stock_quantity
                    );
        }
        whatDo();
    });
}

function addInventory() {
    connection.query({
        sql: 'SELECT product_name FROM products'
    }, function(err, res) {
        if (err) throw err;
        var itemList = [];
        for (let i=0; i<res.length; i++) {
            itemList.push(res[i].product_name);
        }
        inquirer
            .prompt([{
                name: 'product_name',
                type: 'list',
                message: 'What item would you like to add more stock?',
                choices: itemList
            }, {
                name: 'stock_quantity',
                type: 'input',
                validate: validatePositiveInt,
                message: 'How much would you like to add: '
            }])
        .then(function(answer) {
            updateInventory(answer);
        });
    });
}

function updateInventory(answer) {
    connection.query({
        sql: 'SELECT stock_quantity FROM products WHERE ?',
        values: { product_name: answer.product_name }
    }, function(err, res) {
        let updatedStock = res[0].stock_quantity + parseInt(answer.stock_quantity);
        connection.query({
            sql: 'UPDATE products SET ? WHERE ?',
            values: [{ stock_quantity: updatedStock}, {product_name: answer.product_name}],
        }, function(err) {
            if (err) throw err;
            console.log(answer.stock_quantity + ' units of ' + answer.product_name + ' added to its stock.');
            whatDo();
        });
    });
}

function addProduct() {
    inquirer
        .prompt([{
            name: 'product_name',
            type: 'input',
            //validate: validateExist,
            message: 'Product name: '
        }, {
            name: 'department_name',
            type: 'input',
            message: 'Department name: '
        }, {
            name: 'price',
            type: 'input',
            validate: validatePrice,
            message: 'Price: '
        }])
    .then(function(answer) {
        connection.query({
            sql: 'INSERT INTO products (product_name, department_name, price) VALUES (?, ?, ?)',
            values: [answer.product_name, answer.department_name, parseFloat(answer.price)]
        }, function(err) {
            if (err) {
                console.log('Product ' + answer.product_name + ' already exists, addition failed.');
            } else {
                console.log('New product ' + answer.product_name + ' added.');
            }
            whatDo();
        });
    });
}

function removeProduct() {
    connection.query({
        sql: 'SELECT product_name FROM products'
    }, function(err, res) {
        if (err) throw err;
        var itemList = [];
        for (let i=0; i<res.length; i++) {
            itemList.push(res[i].product_name);
        }
        inquirer
            .prompt([{
                name: 'product_name',
                type: 'list',
                message: 'Select an item to remove from products.',
                choices: itemList
            }, {
                name: 'confirmChoice',
                type: 'list',
                message: 'Are you sure?',
                choices: ['Yes', 'No']
            }])
        .then(function(answer) {
            deleteRow(answer);
        });
    });
}

function deleteRow(answer) {
    if (answer.confirmChoice === 'Yes') {
        connection.query({
            sql: 'DELETE FROM products where ?',
            values: { product_name: answer.product_name }
        }, function(err) {
            if (err) throw err;
            console.log('Item \"' + answer.product_name + '\" has been removed.');
            whatDo();
        });
    } else {
        console.log('Okay.');
        whatDo();
    }
}

function validatePositiveInt(inputValue) {
    if (Number.isInteger(parseFloat(inputValue)) && parseFloat(inputValue) >= 0) {
        return true;
    } else {
        console.log('\nInput value is not a positive whole number.');
        return false;
    }
}

function validatePrice(inputValue) {
    if (!isNaN(parseFloat(inputValue)) && isFinite(inputValue)) {
        return true;
    } else {
        console.log('\nPlease input a valid price.');
        return false;
    }
}
