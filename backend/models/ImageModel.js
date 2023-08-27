import mongoose from 'mongoose';

const imageModel = new mongoose.Schema({
  fileName: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
  },
}, { timestamps: true });

export default mongoose.model('imageModel', imageModel);
