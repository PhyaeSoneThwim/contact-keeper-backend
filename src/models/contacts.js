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
  role: {
    type: String,
    required: [true, "role is required"],
  },
  address: String,
  website: String,
  facebook: String,
  twitter: String,
});

const Contacts = mongoose.model("Contacts", contactSchema);
module.exports = Contacts;
