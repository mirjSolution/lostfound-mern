const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Lostandfound = require('../models/LostAndFound');
const moment = require('moment');

// @desc    Get all valuable items to be released
// @route   GET /api/v1/items/valuables
// @access  Private
exports.getValuables = asyncHandler(async (req, res, next) => {
  //Obtain valuable items in 90 days

  let valuable = moment().subtract(6, 'months').format('YYYY-MM-DD');
  const lostandfound = await Lostandfound.find({
    datefound: { $lte: valuable },
  }).sort('-packageno');
  res.status(200).json({
    success: true,
    count: lostandfound.length,
    data: lostandfound,
    valuable: valuable,
  });
});

// @desc    Get all nonvaluable items to be released
// @route   GET /api/v1/items/nonvaluables
// @access  Private
exports.getNonValuables = asyncHandler(async (req, res, next) => {
  //Obtain vnonaluable items in 30 days
  let nonvaluable = moment().subtract(3, 'months').format('YYYY-MM-DD');
  const lostandfound = await Lostandfound.find({
    datefound: { $lte: nonvaluable },
  }).sort('-packageno');
  res.status(200).json({
    success: true,
    count: lostandfound.length,
    data: lostandfound,
  });
});

// @desc    Get all perishable items to be released
// @route   GET /api/v1/items/perishables
// @access  Private
exports.getPerishables = asyncHandler(async (req, res, next) => {
  //Obtain perishable items in 1 day
  let perishable = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const lostandfound = await Lostandfound.find({
    datefound: { $lte: perishable },
  }).sort('-packageno');
  res.status(200).json({
    success: true,
    count: lostandfound.length,
    data: lostandfound,
  });
});

// @desc    Get all lost and found items
// @route   GET /api/v1/items
// @access  Private
exports.getItems = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.find().sort('-packageno');

  res
    .status(200)
    .json({ success: true, count: lostandfound.length, data: lostandfound });
});

// @desc    Get all Lost and found items to be claim
// @route   GET /api/v1/items/tobeclaimed
// @access  Private
exports.getToBeClaimed = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.find({
    $or: [
      { status: 'to be claim' },
      { status1: 'to be claim' },
      { status2: 'to be claim' },
    ],
  }).sort('-packageno');

  res
    .status(200)
    .json({ success: true, count: lostandfound.length, data: lostandfound });
});

// @desc    Get all Lost and found items claimed by employee
// @route   GET /api/v1/items/claimedemp
// @access  Private
exports.getClaimedEmp = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.find({
    $or: [
      { status: 'claimed by employee' },
      { status1: 'claimed by employee' },
      { status2: 'claimed by employee' },
    ],
  }).sort('-packageno');

  res
    .status(200)
    .json({ success: true, count: lostandfound.length, data: lostandfound });
});

// @desc    Get all Lost and found items claimed by guest
// @route   GET /api/v1/items/claimedguest
// @access  Private
exports.getClaimedGuest = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.find({
    $or: [
      { status: 'claimed by guest' },
      { status1: 'claimed by guest' },
      { status2: 'claimed by guest' },
    ],
  }).sort('-packageno');

  res
    .status(200)
    .json({ success: true, count: lostandfound.length, data: lostandfound });
});

// @desc    Get single lost and found items
// @route   GET /api/v1/items/:id
// @access  Public
exports.getItem = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.findById(req.params.id);

  if (!lostandfound) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: lostandfound });
});

// @desc    Create lost and found items
// @route   POST /api/v1/items
// @access  Private
exports.createItems = asyncHandler(async (req, res, next) => {
  const { valuable, nonvaluable, perishable } = req.body;
  if (
    (valuable === '' && nonvaluable === '' && perishable === '') ||
    (!valuable && !nonvaluable && !perishable)
  ) {
    return next(new ErrorResponse(`Please enter lost and found items`, 404));
  }

  // Add user to req,body
  req.body.usercreate = req.user.id;

  const lostandfound = await Lostandfound.create(req.body);
  res.status(201).json({
    success: true,
    data: lostandfound,
  });
});

// @desc    Update lost and found items
// @route   PUT /api/v1/items/:id
// @access  Private
exports.updateItems = asyncHandler(async (req, res, next) => {
  const { valuable, nonvaluable, perishable } = req.body;
  if (
    (valuable === '' && nonvaluable === '' && perishable === '') ||
    (!valuable && !nonvaluable && !perishable)
  ) {
    return next(new ErrorResponse(`Please enter lost and found items`, 404));
  }

  // Add user to req,body
  req.body.usercreate = req.user.id;

  const lostandfound = await Lostandfound.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!lostandfound) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: lostandfound });
});

// @desc    Delete lost and found items
// @route   DELETE /api/v1/items/:id
// @access  Private
exports.deleteItems = asyncHandler(async (req, res, next) => {
  const lostandfound = await Lostandfound.findByIdAndDelete(req.params.id);
  if (!lostandfound) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
