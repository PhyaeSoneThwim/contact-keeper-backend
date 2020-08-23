const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    minlength: [6, "minimum 6 characters required"],
    required: [true, "password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password is required"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "passwords are not the same",
    },
  },
  profile: String,
  bios: String,
  website: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.checkPassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
