import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: String,
  jobTitle: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  location: String,
  portfolioUrl: String,
  githubUrl: String,
  linkedinUrl: String,
  experience: String,
  coverLetter: String,
  skills: String,
  availability: String,
  salary: String,
  status: {
    type: String,
    enum: ["pending","reviewing","shortlisted","rejected","hired"],
    default: "pending"
  },
  notes: String
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
