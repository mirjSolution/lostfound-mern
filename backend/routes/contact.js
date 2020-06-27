const express = require('express');
const {
  getContacts,
  createmessage,
  deleteMessage,
} = require('../controllers/contact');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Get all Contacts and create message
router.route('/').get(protect, getContacts).post(createmessage);

// Delete Message
router.route('/:id').delete(protect, authorize('admin'), deleteMessage);

module.exports = router;
