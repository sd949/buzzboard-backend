const database = require("../lib/database");
const { DB_NAME, ORDERS, ORDERS_HIST } = require("../constants/database");
const { raiseError, genericErrorLog, logInfo } = require("../lib/utils");

const apiDeleteOrder = async function (req, res) {
  logInfo("apiDeleteOrder Calling ...");
  try {
    let findBy = {};

    if (!req.body.order_id) {
      raiseError(res, "order_id is required!");
      return;
    }

    findBy["order_id"] = req.body.order_id;

    let client = await database.getClient();

    //to maintain Deleted data history we can push the order details to another collection for future use

    // const order =await client.db(DB_NAME).collection(ORDERS).find(findBy).toArray()
    // if(order.length>0){
    //     const result = await client.db(DB_NAME).collection(ORDERS_HIST).findOneAndUpdate(
    //         findBy,
    //         { $set: payload},
    //         { returnNewDocument: true, upsert: true, returnOriginal: false }
    //     );
    // }

    const result = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .deleteOne(findBy);

    if (!result.deletedCount) {
      //if result.deletedCount == 0 that means not data exists/deleted on that order id
      res.send({ body: { success: true, message: "Order does not exists" } });
      return;
    }

    res.send({
      body: {
        success: false,
        message: "Order Deleted Successfully",
        data: result,
      },
    });
    return;
  } catch (err) {
    await genericErrorLog(err, "apiDeleteOrder");
    res.send({ body: { success: false, message: err.toString() } });
    return;
  }
};

module.exports = { apiDeleteOrder };
