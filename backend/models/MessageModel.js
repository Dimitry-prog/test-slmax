import mongoose from 'mongoose';

const messageModel = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
  },
});

export default mongoose.model('messageModel', messageModel);
