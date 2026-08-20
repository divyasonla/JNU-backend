import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  enrollNo: { type: String, required: true, uppercase: true },
  rollNo: { type: String, required: true, index: true },
  name: { type: String, required: true, uppercase: true },
  fatherName: { type: String, required: true, uppercase: true },
  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, required: true },
  result: { type: String, required: true, enum: ['PASS', 'FAIL', 'WITHHELD'], default: 'PASS' },
  remark: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
