const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  participants: [{
    type: String,
    required: true
  }],
  username: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'conversations',
  _id: false,
});

module.exports = mongoose.model('Conversation', conversationSchema);