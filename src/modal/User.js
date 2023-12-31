import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image :{
    type: String,
  },
  isAdmin: {
    default: true,
    type: Boolean,
  },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
