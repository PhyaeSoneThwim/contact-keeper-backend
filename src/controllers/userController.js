const _ = require("lodash");
const Users = require("../models/users");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const unLink = require("../utils/unLink");

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  if (!user) {
    return next(new AppError("no user information", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not defined to update password"));
  }
  const user = await Users.findById(req.user._id);
  if (req.body.profile && user.profile) {
    unLink(`public/images/users/${user.profile}`);
  }
  const updatedUser = await Users.findByIdAndUpdate(
    req.user._id,
    _.pick(req.body, ["name", "profile", "bios", "website"]),
    { new: true, runValidators: true }
  );
  res.status(200).send({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
