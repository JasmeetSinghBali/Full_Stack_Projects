const mongoose = require('mongoose');

const { Schema } = mongoose;

const flaggedSchema = new Schema({
  data: Array,
});

const FlaggedUser = mongoose.model('FlaggedUser', flaggedSchema);

module.exports = FlaggedUser;
