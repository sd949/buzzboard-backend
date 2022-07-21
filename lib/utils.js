const database = require("./database");
const { DB_NAME, GENERIC_ERR_LOG } = require("../constants/database");

const CONSOLE_COLOR_YELLOW = "\x1b[33m%s\x1b[0m";
const CONSOLE_COLOR_RED = "\x1b[31m%s\x1b[0m";
const CONSOLE_COLOR_BLUE = "\x1b[34m%s\x1b[0m";

const logError = (msg) => {
  console.log(CONSOLE_COLOR_RED, msg);
};

const logInfo = (msg) => {
  console.log(CONSOLE_COLOR_BLUE, msg);
};

const logWarn = (msg) => {
  console.log(CONSOLE_COLOR_YELLOW, msg);
};

// return error
const raiseError = (res, message, status = 500) => {
  console.log(message);
  res.send({ status, body: { success: false, message } });
};

const genericErrorLog = async (err, errorSource) => {
  try {
    let errorMessage = err.toString();
    let errorStack = err.stack;
    let client = await database.getClient();
    await client.db(DB_NAME).collection(GENERIC_ERR_LOG).insertOne({
      errorMessage,
      errorStack,
      errorSource,
      createdTimeUnix: getEpochTime(),
      createdDt: new Date(),
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  logError,
  logInfo,
  logWarn,
  raiseError,
  genericErrorLog,
};
