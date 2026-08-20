import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  published: { type: Boolean, default: true }
}, {
  timestamps: true,
});

const News = mongoose.model('News', newsSchema);
export default News;
