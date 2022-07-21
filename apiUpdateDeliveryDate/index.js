const database = require("../lib/database");
const { DB_NAME, ORDERS } = require("../constants/database");
const { raiseError, genericErrorLog, logInfo } = require("../lib/utils");
const apiUpdateDeliveryDate = async function (req, res) {
  logInfo("apiUpdateDeliveryDate Calling ...");
  try {
    let payload = {};
    let findBy = {};

    if (!req.body.order_id) {
      raiseError(res, "order_id is required!");
      return;
    }
    if (!req.body.delivery_date) {
      raiseError(res, "delivery_date is required!");
      return;
    }

    payload["delivery_date"] = req.body.delivery_date;

    findBy["order_id"] = req.body.order_id;

    let client = await database.getClient();

    const result = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .findOneAndUpdate(
        findBy,
        { $set: payload },
        { returnNewDocument: true, upsert: false, returnOriginal: false }
      );

    let flag = !result ? false : true;
    if (!result.value) {
      res.send({ body: { success: flag, message: "order doesn't exist." } });
      return;
    }
    res.send({
      body: {
        success: flag,
        message: "Order Updated Successfully",
        data: result,
      },
    });
    return;

  } catch (err) {
    await genericErrorLog(err, "apiUpdateDeliveryDate");
    res.send({ body: { success: false, message: err.toString() } });
    return;
  }
};

module.exports = { apiUpdateDeliveryDate };
