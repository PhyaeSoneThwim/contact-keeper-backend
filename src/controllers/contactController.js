const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const unLink = require("../utils/unLink");
const Contacts = require("../models/contacts");
const AppError = require("../utils/appError");

exports.addContact = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const contact = await Contacts.findOne({ email });
  if (contact) {
    return next(
      new AppError("contact with requested email already exists", 409)
    );
  }
  const newContact = await Contacts.create(
    _.assign(req.body, { user: req.user._id })
  );
  res.status(201).send({
    status: "success",
    data: {
      contact: newContact,
    },
  });
});

exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contacts.find({ user: req.user._id });
  if (!contacts.length > 0) {
    return next(new AppError("no contact information", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    return next(new AppError("no contact information", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    return next(new AppError("no contact information", 404));
  }
  if (req.body.photo && contact.photo) {
    unLink(`public/images/contacts/${contact.photo}`);
  }
  const newContact = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      contact: newContact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    return next(new AppError("no contact information", 404));
  }
  if (contact.photo) {
    unLink(`public/images/contacts/${contact.photo}`);
  }
  await Contacts.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  });
});
