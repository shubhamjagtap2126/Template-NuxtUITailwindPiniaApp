import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  group: { type: String, required: true },
  contact: { type: String, required: true },
  district: { type: String },
  center: { type: String },
  gender: { type: String },
  pincode: { type: String },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
