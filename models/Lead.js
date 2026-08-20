import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  leadType: { 
    type: String, 
    enum: ['ADMISSION_APPLY', 'RESULT_VIEW'], 
    required: true 
  },
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  programInterested: { 
    type: String // Required conceptually for ADMISSION_APPLY
  },
  rollNumber: { 
    type: String // Required conceptually for RESULT_VIEW
  },
  status: { 
    type: String, 
    enum: ['NEW', 'CONTACTED', 'CLOSED'], 
    default: 'NEW' 
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
