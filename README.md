1. Create a new order by accepting the following JSON payload as a POST request, validate for
duplicate orders based on order_id.
Enpoint : /orders/create
{
"order_id": "123",
"item_name":"Samsung Mobile",
"cost":"400",
"order_date":"2020/12/01",
"delivery_date":"2020/12/11"
}
2. Update the order for a specific order ID to update the delivery_date based on the updated
value provided to the API, can be GET or POST method.
Endpoint : /orders/update
3. List all orders for a given date in yyyy/mm/dd format.
Endpoint : /orders/list
4. Query for a specific order with Order ID, can be GET or POST method.
Endpoint : /orders/search
5. Delete an order with Order ID.
Endpoint : /orders/delete


To start the app
1. create .env containing 
  DB_NAME = 
  DB_URL = 
  PORT = 
  POOL_SIZE = 

2. do npm i 

now your server is up & running 

Notes:-

1.in lib/utils generic error log is the file where all the  error will be logged for dubag perpose
2. config data is somthing where all the structure was saved
3. database.js contains all the data base related connection, 
4. constants/database contains all the collection name

Thanks
