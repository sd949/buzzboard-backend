const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./lib/database");
const { logInfo, logWarn } = require("./lib/utils");
const http = require("http");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE ,GET,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With Content-Type, Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE ,GET,PATCH");
  }
  next();
});

// all of our routes will be prefixed with /api
app.use("/orders", require("./routes/routes"));

const startDB = async () => {
  let client = await database.getClient();
  if (client) {
    logWarn("DataBase Connected Successfully");
  }
};
var server = http.createServer(app);

app.set("port", process.env.PORT || 5000);

server.listen(app.get("port"), async () => {
  await startDB();
  logInfo("CORS-enabled web server listening on port 5000");
});
