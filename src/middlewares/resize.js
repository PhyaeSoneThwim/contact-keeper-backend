const sharp = require("sharp");
const faker = require("faker");
const catchAsync = require("../utils/catchAsync");

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `contact-${faker.random.uuid()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/contacts/${filename}`);
  req.body.photo = filename;
  next();
});
