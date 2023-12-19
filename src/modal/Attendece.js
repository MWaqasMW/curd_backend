import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
course:{
type : String,
required :true
},
  isPresent:{
    type:Boolean,
    required : true,
  },

  timestamp: { type: Date, default: Date.now },
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

export default Attendence;
