import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
  published: { type: Boolean, default: true }
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
