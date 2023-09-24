const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  // data: mongoose.Schema.Types.Mixed,
}, {
  collection: 'users',
  strict: false,
  _id: false,
});

module.exports = mongoose.model('User', userSchema);
