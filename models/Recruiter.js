import mongoose from 'mongoose';

const recruiterSchema = mongoose.Schema({
  companyName: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  status: { type: Boolean, default: true }
}, {
  timestamps: true,
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
export default Recruiter;
