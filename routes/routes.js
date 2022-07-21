var express = require('express')
const router = express.Router();
const { logInfo } = require('../lib/utils');

var apiCreateOrder = require("../apiCreateOrder/index")
var apiUpdateDeliveryDate = require("../apiUpdateDeliveryDate/index")
var apiGetOrderList = require("../apiGetOrderList/index")
var apiSearchOrder = require("../apiSearchOrder/index")
var apiDeleteOrder = require("../apiDeleteOrder/index")

//to create new order
router.post('/create', (req,res)=>{
    apiCreateOrder.apiCreateOrder(req,res)
}) 
//update delivery date
router.post('/update', (req,res)=>{
    apiUpdateDeliveryDate.apiUpdateDeliveryDate(req,res)
})

//to get all order detalis for any delivery date
router.get('/list',(req,res)=>{
    apiGetOrderList.apiGetOrderList(req,res)
})

//search a order using order id
router.get('/search',(req,res)=>{
    apiSearchOrder.apiSearchOrder(req,res)
})

//delete a order by order id
router.post('/delete', (req,res)=>{
    apiDeleteOrder.apiDeleteOrder(req,res)
})

//test api responce
router.get('/test', (req,res)=>{ 
    logInfo("Get Calling ...")
    res.send({"msg" : "Hii Buzzboard"});  
})

module.exports = router;