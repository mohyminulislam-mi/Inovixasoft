import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  department: String,
  type: String,
  location: String,
  salaryMin: Number,
  salaryMax: Number,
  description: String,
  requirements: String,
  niceToHave: String,
  perks: String,
  tags: String,
  status: { type: String, default: "active" },
  urgent: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
