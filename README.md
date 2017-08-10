# Bamazon

INSTRUCTIONS
1. First run "bamazon.sql" to create a table with dummy data

2. Open terminal (or equivalent) and run:
    ...
    npm install
    ...

   Then run the following:
	...
	node bamazonCustomer.js
	...
	- or -
	...
	node bamazonManager.js
	...

3. Follow instructions on screen, everything is explained

FEATURES
1. The products table have each of the following index values:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

2. bamazonCustomer.js

The customer app will prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if the store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

If the store has enough of the product, it should fulfill the customer's order.
   * The SQL database will update to reflect the remaining quantity.
   * The customer is shown the total cost of their purchase.

3. bamazonManager.js

List a set of menu options:

    * View Products for Sale
	- If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
    * View Low Inventory
	- If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
    * Add to Inventory
	- If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    * Add New Product
	- If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
    * Remove Existing Product
	- If a manager selects `Add New Product`, it should allow the manager to remove an existing product from the store.
	- It also prompts a confirmation for removing the product.
