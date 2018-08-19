const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const authentication = {
  method: "POST",
  path: "/api/auth",
  handler: async (request, h) => {
    const { error } = validate(request.payload);
    if (error) return h.response(error.details[0].message).code(400);

    let user = await User.findOne({ email: request.payload.email });
    if (!user) return h.response("Invalid email or password").code(400);

    const validPassword = await bcrypt.compare(
      request.payload.password,
      user.password
    );
    if (!validPassword)
      return h.response("Invalid email or password").code(400);

    return true;
  }
};
function validate(request) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(request, schema);
}
module.exports = [authentication];
