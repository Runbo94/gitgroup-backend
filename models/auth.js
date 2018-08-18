import { User, validate } from "./user";

const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  isAdmin: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false }
});

const Auth = mongoose.model("Auth", authSchema);

exports.Auth = Auth;
