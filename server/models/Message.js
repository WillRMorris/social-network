const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: 'you need to write something!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  messageAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Message = model('Message', messageSchema);

module.exports = Message;
