const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "user is required"],
    ref: "Users",
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  status: {
    type: String,
    default: "untrash",
    enum: {
      values: ["untrash", "trash"],
      message: "status must be either of untrash or trash",
    },
  },
  email: {
    type: String,
    validate: [validator.isEmail, "email is not correct"],
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
  },
  photo: {
    type: String,
    default: "default.jpeg",
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  address: String,
});

const Contacts = mongoose.model("Contacts", contactSchema);
module.exports = Contacts;
