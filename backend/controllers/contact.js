const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Contact = require('../models/Contact');
const moment = require('moment');

// @desc    Get all lost and found items
// @route   GET /api/v1/contact
// @access  Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');
  res
    .status(200)
    .json({ success: true, count: contacts.length, data: contacts });
});

// @desc    Create Message
// @route   POST /api/v1/contact/createmessage
// @access  Public
exports.createmessage = asyncHandler(async (req, res, next) => {
  const { name, email, contact, message } = req.body;

  // Create message
  const createMessage = await Contact.create({
    name,
    email,
    contact,
    message,
    // createdAt: moment().format('ll'),
    createdAt: moment().format('ll'),
  });

  res.status(200).json({ success: true, data: createMessage });
});

// @desc    Delete Contacts
// @route   DELETE /api/v1/items/:id
// @access  Private
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const deleteMessage = await Contact.findByIdAndDelete(req.params.id);
  if (!deleteMessage) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
