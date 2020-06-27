const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LostAndFoundSchema = new mongoose.Schema({
  usercreate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  useredit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  datefound: {
    type: String,
    default: () => moment().format('YYYY-MM-DD'),
  },
  area: {
    type: String,
    trim: true,
    required: [true, 'Please add area/location'],
    maxlength: [50, 'Area Can not be more than 50 characters'],
  },
  guest: {
    type: String,
    trim: true,
    maxlength: [50, 'Guest/Owner Can not be more than 50 characters'],
  },
  valuable: {
    type: String,
    trim: true,
    maxlength: [100, 'Valuable Can not be more than 100 characters'],
  },
  status: {
    type: String,
    enum: [
      'unclaimed',
      'to be claim',
      'claimed by guest',
      'claimed by employee',
    ],
    default: 'unclaimed',
  },
  dateclaimed: {
    type: String,
  },
  claimedby: {
    type: String,
    trim: true,
    maxlength: [50, 'Finder can not be more than 50 characters'],
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [100, 'Remarks can not be more than 100 characters'],
  },
  nonvaluable: {
    type: String,
    trim: true,
    maxlength: [100, 'Non valuable can not be more than 100 characters'],
  },
  status1: {
    type: String,
    enum: [
      'unclaimed',
      'to be claim',
      'claimed by guest',
      'claimed by employee',
    ],
    default: 'unclaimed',
  },
  dateclaimed1: {
    type: String,
  },
  claimedby1: {
    type: String,
    trim: true,
    maxlength: [50, 'Finder can not be more than 50 characters'],
  },
  remarks1: {
    type: String,
    trim: true,
    maxlength: [100, 'Remarks can not be more than 100 characters'],
  },
  perishable: {
    type: String,
    trim: true,
    maxlength: [100, 'Perishable can not be more than 100 characters'],
  },
  status2: {
    type: String,
    enum: [
      'unclaimed',
      'to be claim',
      'claimed by guest',
      'claimed by employee',
    ],
    default: 'unclaimed',
  },
  dateclaimed2: {
    type: String,
  },
  claimedby2: {
    type: String,
    trim: true,
    maxlength: [50, 'Finder can not be more than 50 characters'],
  },
  remarks2: {
    type: String,
    trim: true,
    maxlength: [100, 'Remarks can not be more than 100 characters'],
  },
  finder: {
    type: String,
    trim: true,
    required: [true, 'Please add finder'],
    maxlength: [50, 'Finder can not be more than 50 characters'],
  },
  department: {
    type: String,
    trim: true,
    required: [true, 'Please add division'],
    maxlength: [50, 'Department can not be more than 50 characters'],
  },
});

// LostAndFoundSchema.pre('save', function (next) {
//   this.dateclaimed = moment().format('ll');

//   next();
// });

LostAndFoundSchema.plugin(AutoIncrement, {
  inc_field: 'packageno',
  start_seq: 00001,
});

module.exports = mongoose.model('Lostandfound', LostAndFoundSchema);
