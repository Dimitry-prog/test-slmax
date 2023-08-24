import mongoose from 'mongoose';

const chatModel = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
  },
  images: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model('chatModel', chatModel);
