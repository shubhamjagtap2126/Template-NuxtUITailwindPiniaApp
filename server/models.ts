import mongoose from 'mongoose';
import { uid } from 'uid';

const { Schema, model, models } = mongoose;

// User Schema
const UserSchema = new Schema(
  {
    _id: { type: String, default: () => `U${uid(5)}`, unique: true },
    name: { type: String, required: true },
    contact: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String, enum: ['parent', 'admin'], default: 'parent' },
    avatar: { type: String, default: '' },
    paidWeeks: [{ weekId: { type: Schema.Types.String, ref: 'Activity' }, weekNo: { type: String } }],
    language: { type: String, default: 'en' },
    token: { type: String, default: '' },
  },
  { timestamps: true },
);

export const User = model('User', UserSchema);
