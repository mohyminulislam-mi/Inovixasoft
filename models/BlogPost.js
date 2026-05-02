import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  category: String,
  excerpt: String,
  content: String,
  author: String,
  status: { type: String, default: "draft" },
  featured: { type: Boolean, default: false },
  readTime: String,
  publishedAt: Date
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
