import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
  type: { type: String, default: "text" },
  group: { type: String, default: "general" }
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
