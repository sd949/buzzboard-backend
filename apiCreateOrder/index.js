const database = require("../lib/database");
const { DB_NAME, ORDERS } = require("../constants/database");
const { raiseError, genericErrorLog, logInfo } = require("../lib/utils");

const apiCreateOrder = async function (req, res) {
  logInfo("apiCreateOrder Calling ...");
  try {
    let payload = {};
    let findBy = {};

    if (!req.body.order_id) {
      raiseError(res, "order_id is required!");
      return;
    }
    if (!req.body.cost) {
      raiseError(res, "cost is required!");
      return;
    }
    if (!req.body.order_date) {
      raiseError(res, "order_date is required!");
      return;
    }
    if (!req.body.item_name) {
      raiseError(res, "Class is required!");
      return;
    }
    if (!req.body.delivery_date) {
      raiseError(res, "delivery_date is required!");
      return;
    }

    payload["order_id"] = req.body.order_id;
    payload["cost"] = req.body.cost;
    payload["order_date"] = req.body.order_date;
    payload["item_name"] = req.body.item_name;
    payload["delivery_date"] = req.body.delivery_date;

    findBy["order_id"] = req.body.order_id;

    let client = await database.getClient();

    //to check the dublicate order
    const dublicate = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .find(findBy)
      .toArray();
    if (dublicate.length > 0) {
      res.send({ body: { success: false, message: "order already exist." } });
      return;
    }

    const result = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .findOneAndUpdate(
        findBy,
        { $set: payload },
        { returnNewDocument: true, upsert: true, returnOriginal: false }
      );

    res.send({
      body: {
        success: true,
        message: "Order Created Successfully",
        data: result,
      },
    });
    return;
  } catch (err) {
    await genericErrorLog(err, "apiCreateOrder");
    res.send({ body: { success: false, message: err.toString() } });
    return;
  }
};

module.exports = { apiCreateOrder };
