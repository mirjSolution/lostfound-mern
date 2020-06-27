const mongoose = require('mongoose');
const moment = require('moment');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [50, 'Finder can not be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  contact: {
    type: String,
    required: [true, 'Please add a contact number'],
    maxlength: [15, 'Contact can not be more than 15 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [250, 'Message can not be more than 100 characters'],
  },
  createdAt: {
    type: String,
    default: () => moment().format('ll'),
  },
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
