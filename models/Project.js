import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  category: String,
  description: String,
  techStack: String,
  status: { type: String, default: "ongoing" },
  featured: { type: Boolean, default: false },
  clientName: String,
  liveUrl: String,
  githubUrl: String
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
