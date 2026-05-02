import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  sessionId: String,
  sender: String,
  message: String
}, { timestamps: true });

export default mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);
