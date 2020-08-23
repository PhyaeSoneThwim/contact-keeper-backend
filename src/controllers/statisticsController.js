const Contacts = require("../models/contacts");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getStatistics = catchAsync(async (req, res, next) => {
  //test new commit with current private user
  const statistics = await Contacts.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);
  if (!statistics.length > 0) {
    return next(new AppError("no contact statistics"));
  }
  res.status(200).json({
    status: "success",
    data: {
      statistics,
    },
  });
});
