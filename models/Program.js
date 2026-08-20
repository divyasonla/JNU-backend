import mongoose from 'mongoose';

const programSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['UG', 'PG', 'Doctoral', 'Diploma', 'Certificate'] },
  department: { type: String, required: true },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  fees: { type: String },
  description: { type: String },
  image: { type: String },
  status: { type: Boolean, default: true }
}, {
  timestamps: true,
});

const Program = mongoose.model('Program', programSchema);
export default Program;
