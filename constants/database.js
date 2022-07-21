const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_NAME: process.env.DB_NAME,
    ORDERS : "orders",
    ORDERS_HIST : "ordersHistory",
    GENERIC_ERR_LOG : "genericErrorLog",
   
}