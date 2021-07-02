const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

const logSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: String,
    default: 'NaN',
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  image: String,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  },
}, { timestamps: true });

const LogsEntry = mongoose.model('LogsEntry', logSchema);

module.exports = LogsEntry;
