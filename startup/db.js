const winston = require("winston");
const mongoose = require("mongoose");

const logger = winston.createLogger();
function db() {
  mongoose
    .connect(
      "mongodb://homer:ZRBdayup1!@ds125872.mlab.com:25872/gitgroup-auth-db"
    )
    .then(() => logger.info(`Connected to the Database`));
}
module.exports = db;
