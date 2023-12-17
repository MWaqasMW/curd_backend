import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

export default Attendence;
