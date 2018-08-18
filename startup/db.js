const mongoose = require("mongoose");
const config = require("config");

function db(server) {
  mongoose
    .connect(
      `mongodb://${config.get("db.user")}:${config.get(
        "db.password"
      )}@ds125872.mlab.com:25872/gitgroup-auth-db`
    )
    .then(() => server.log("Info", `Connected to the Database`));
}
module.exports = db;
