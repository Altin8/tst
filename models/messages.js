const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  docId: String,
  recipient_id: String,
  sender_id: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);
