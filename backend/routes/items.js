const express = require('express');
const {
  getItems,
  getItem,
  createItems,
  updateItems,
  deleteItems,
  getClaimedEmp,
  getClaimedGuest,
  getToBeClaimed,
  getValuables,
  getNonValuables,
  getPerishables,
} = require('../controllers/items');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

//Items to be release valuables
router.route('/valuables').get(protect, getValuables);

//Items to be release nonvaluables
router.route('/nonvaluables').get(protect, getNonValuables);

//Items to be release perishable
router.route('/perishables').get(protect, getPerishables);

//Get all Lost and found items claimed by employee
router.route('/claimedemp').get(protect, getClaimedEmp);

//Get all Lost and found items claimed by employee
router.route('/claimedguest').get(protect, getClaimedGuest);

//Get all Lost and found items to be claim
router.route('/tobeclaimed').get(protect, getToBeClaimed);

// Get all L&F items and create L&F items
router
  .route('/')
  .get(protect, authorize('user', 'admin'), getItems)
  .post(protect, authorize('user', 'admin'), createItems);

// Get single L&F item, update and delete L&F items
router
  .route('/:id')
  .get(protect, authorize('user', 'admin'), getItem)
  .put(protect, authorize('user', 'admin'), updateItems)
  .delete(protect, authorize('user', 'admin'), deleteItems);

module.exports = router;
