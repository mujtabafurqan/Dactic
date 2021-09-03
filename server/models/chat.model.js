const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const MessageSchema = mongoose.Schema({
  userOrExpertId: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    required: true,
    trim: true,
  },
  readStatus: {
    type: Boolean,
    required: true,
    trim: true,
  },
  userOrExpertName: String,
  role: String,
});

const chatSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  expertId: {
    type: String,
    trim: true,
  },
  discipline: {
    type: String,
    required: true,
    trim: true,
  },

  subDiscipline: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  linksReferred: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    required: true,
    trim: true,
  },
  startedTimestamp: {
    type: Date,
    required: true,
    trim: true,
  },
  lastUpdatedTimestamp: {
    type: Date,
    required: true,
    trim: true,
  },
  messages: {
    type: [MessageSchema],
    required: true,
  },
  listOfEligibleExperts: Array,
  userName: String,
  expertName: String,
  userUnreadCount: Number,
  expertUnreadCount: Number,
});

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
