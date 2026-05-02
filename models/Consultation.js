import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  topic: String,
  preferredDate: String,
  preferredTime: String,
  timezone: String,
  notes: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
