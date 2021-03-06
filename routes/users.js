const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const register = {
  method: "POST",
  path: "/api/users",
  handler: async (request, h) => {
    const { error } = validate(request.payload);
    if (error) return h.response(error.details[0].message).code(400);

    let user = await User.findOne({ email: request.payload.email });
    if (user) return h.response("User already registered").code(400);

    user = new User(_.pick(request.payload, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign(
      _.pick(user, ["_id", "name", "email"]),
      config.get("jwt.private_key")
    );

    return h
      .response(_.pick(user, ["_id", "name", "email"]))
      .header("x-auth-token", token);
  }
};

const test = {
  method: "GET",
  path: "/api/test",
  config: { auth: "jwt" },
  handler: function(request, h) {
    return { text: "This is protected thing!" };
  }
};

module.exports = [register, test];
