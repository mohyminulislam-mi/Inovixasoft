import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  quote: String,
  rating: { type: Number, default: 5 },
  featured: { type: Boolean, default: false },
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
