const database = require("../lib/database");
const { DB_NAME, ORDERS } = require("../constants/database");
const { raiseError, genericErrorLog, logInfo } = require("../lib/utils");

const apiGetOrderList = async function (req, res) {
  logInfo("apiGetOrderList Calling ...");
  try {
    let findBy = {};

    if (!req.query.delivery_date) {
      raiseError(res, "delivery_date is required!");
      return;
    }

    findBy["delivery_date"] = req.query.delivery_date;

    let client = await database.getClient();

    const result = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .find(findBy)
      .toArray();

    res.send({ body: { success: true, data: result } });
  } catch (err) {
    await genericErrorLog(err, "apiGetOrderList");
    res.send({ body: { success: false, message: err.toString() } });
    return;
  }
};

module.exports = { apiGetOrderList };
