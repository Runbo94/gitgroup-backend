const github = require("./github");
const users = require("./users");
const auth = require("./auth");

module.exports = [].concat(github, users, auth);
