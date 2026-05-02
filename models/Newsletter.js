import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
