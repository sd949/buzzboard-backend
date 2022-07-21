const database = require("../lib/database");
const { DB_NAME, ORDERS } = require("../constants/database");
const { raiseError, genericErrorLog, logInfo } = require("../lib/utils");

const apiSearchOrder = async function (req, res) {
  logInfo("apiSearchOrder Calling ...");
  try {
    let findBy = {};

    if (!req.query.order_id) {
      raiseError(res, "order_id is required!");
      return;
    }

    findBy["order_id"] = req.query.order_id;

    let client = await database.getClient();

    const result = await client
      .db(DB_NAME)
      .collection(ORDERS)
      .find(findBy)
      .toArray();
    if (result.length == 0) {
      res.send({ body: { success: true, message: "order does not exists " } });
    }
    res.send({ body: { success: true, data: result } });
  } catch (err) {
    await genericErrorLog(err, "apiSearchOrder");
    res.send({ body: { success: false, message: err.toString() } });
    return;
  }
};

module.exports = { apiSearchOrder };
