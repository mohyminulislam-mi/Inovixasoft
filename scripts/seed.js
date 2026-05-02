const mongoose = require('mongoose');
const dotenv = require('dotenv');

// We use require for scripts because they are usually run with node, and we want to keep it simple.
// However, the project uses ES modules in Next.js.
// Since this is a standalone script, we can use require if we don't have "type": "module" in package.json
// Or we can use dynamic imports if we do. 
// Given the environment, I'll use commonjs for the seed script but I need to make sure the models can be loaded.
// Actually, it's better to use a version of models that works with this script or just define schemas here.

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env.local');
  process.exit(1);
}

// Define schemas directly in the seed script to avoid import issues between ESM and CJS
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  service: String,
  budget: String,
  message: { type: String, required: true },
  status: { type: String, default: "new" },
  notes: String
}, { timestamps: true });

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
  status: { type: String, default: "pending" }
}, { timestamps: true });

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
  status: { type: String, default: "pending" },
  notes: String
}, { timestamps: true });

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

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  quote: String,
  rating: { type: Number, default: 5 },
  featured: { type: Boolean, default: false },
  status: { type: String, default: "active" }
}, { timestamps: true });

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }
}, { timestamps: true });

const ChatMessageSchema = new mongoose.Schema({
  sessionId: String,
  sender: String,
  message: String
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
  type: { type: String, default: "text" },
  group: { type: String, default: "general" }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

async function seed() {
  console.log('🌱 Starting database seed...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Contact.deleteMany({}),
      Consultation.deleteMany({}),
      Application.deleteMany({}),
      Job.deleteMany({}),
      Project.deleteMany({}),
      BlogPost.deleteMany({}),
      Testimonial.deleteMany({}),
      Newsletter.deleteMany({}),
      ChatMessage.deleteMany({}),
      Settings.deleteMany({})
    ]);
    console.log('🧹 Cleared existing data');

    // Seed Contacts
    await Contact.create([
      { name: 'John Doe', email: 'john@example.com', service: 'Web Development', budget: '$5k - $10k', message: 'Hi, I need a website for my new business.', status: 'new' },
      { name: 'Jane Smith', email: 'jane@company.com', service: 'AI Integration', budget: '$20k+', message: 'Looking for AI consulting for our platform.', status: 'read' },
      { name: 'Alice Johnson', email: 'alice@tech.io', service: 'Mobile App', budget: '$10k - $20k', message: 'Help us build a cross-platform mobile app.', status: 'replied' },
      { name: 'Bob Wilson', email: 'bob@startup.com', service: 'UI/UX Design', budget: '$2k - $5k', message: 'Need a refresh of our current dashboard.', status: 'archived' },
      { name: 'Charlie Brown', email: 'charlie@land.com', service: 'Cloud Automation', message: 'Interested in DevOps services.', status: 'new' }
    ]);
    console.log('✅ Contacts seeded');

    // Seed Consultations
    await Consultation.create([
      { name: 'David Lee', email: 'david@corp.com', topic: 'Technical Strategy', preferredDate: '2024-06-15', preferredTime: '10:00 AM', status: 'confirmed' },
      { name: 'Emma Watson', email: 'emma@agency.com', topic: 'Project Scoping', preferredDate: '2024-06-18', preferredTime: '02:30 PM', status: 'pending' },
      { name: 'Frank Castle', email: 'frank@def.co', topic: 'Architecture Review', preferredDate: '2024-06-20', preferredTime: '11:00 AM', status: 'cancelled' }
    ]);
    console.log('✅ Consultations seeded');

    // Seed Jobs
    await Job.create([
      { title: 'Frontend Developer', slug: 'frontend-dev', department: 'Engineering', type: 'Full-time', location: 'Remote', salaryMin: 80000, salaryMax: 120000, status: 'active', urgent: true },
      { title: 'UX Designer', slug: 'ux-designer', department: 'Design', type: 'Contract', location: 'Hybrid', salaryMin: 60, salaryMax: 90, status: 'active' },
      { title: 'Backend Engineer', slug: 'backend-eng', department: 'Engineering', type: 'Full-time', location: 'Remote', salaryMin: 90000, salaryMax: 140000, status: 'active' },
      { title: 'Project Manager', slug: 'project-manager', department: 'Operations', type: 'Full-time', location: 'NYC', status: 'active' },
      { title: 'DevOps Engineer', slug: 'devops-eng', department: 'Engineering', type: 'Full-time', location: 'Remote', status: 'inactive' },
      { title: 'Mobile Developer', slug: 'mobile-dev', department: 'Engineering', type: 'Full-time', location: 'Remote', status: 'active', urgent: true }
    ]);
    console.log('✅ Job postings seeded');

    // Seed Applications
    await Application.create([
      { firstName: 'Samuel', lastName: 'Jackson', email: 'sam@jackson.com', jobTitle: 'Frontend Developer', status: 'shortlisted', skills: 'React, Tailwind, Next.js' },
      { firstName: 'Olivia', lastName: 'Wild', email: 'olivia@wild.com', jobTitle: 'UX Designer', status: 'pending', skills: 'Figma, Adobe XD' },
      { firstName: 'Liam', lastName: 'Neeson', email: 'liam@neeson.com', jobTitle: 'Backend Engineer', status: 'reviewing', skills: 'Node.js, MongoDB, AWS' },
      { firstName: 'Sophia', lastName: 'Loren', email: 'sophia@loren.com', jobTitle: 'Frontend Developer', status: 'rejected' }
    ]);
    console.log('✅ Job applications seeded');

    // Seed Projects
    await Project.create([
      { title: 'FinTrack dashboard', slug: 'fintrack', category: 'SaaS', featured: true, status: 'completed', techStack: 'Next.js, Tailwind, Recharts' },
      { title: 'HealthConnect App', slug: 'healthconnect', category: 'Mobile App', featured: true, status: 'ongoing', techStack: 'React Native, Firebase' },
      { title: 'EcoShop E-commerce', slug: 'ecoshop', category: 'E-commerce', status: 'completed', techStack: 'Shopify, Custom Liquid' }
    ]);
    console.log('✅ Projects seeded');

    // Seed Blog Posts
    const now = new Date();
    await BlogPost.create([
      { title: 'The Future of AI in Dev', slug: 'future-ai-dev', category: 'AI', author: 'Dr. Alan Turing', status: 'published', featured: true, publishedAt: now },
      { title: 'Mastering Next.js 14', slug: 'mastering-nextjs-14', category: 'Development', author: 'Guillermo Rauch', status: 'published', publishedAt: now },
      { title: 'Design Trends for 2024', slug: 'design-trends-2024', category: 'Design', author: 'Tobias van Schneider', status: 'draft' },
      { title: 'Scaling Your Backend', slug: 'scaling-backend', category: 'Engineering', author: 'Brendan Eich', status: 'published', publishedAt: now }
    ]);
    console.log('✅ Blog posts seeded');

    // Seed Testimonials
    await Testimonial.create([
      { name: 'Tim Cook', role: 'CEO', company: 'Fruit Co', quote: 'ScalexDevs helped us reinvent our digital platform. Outstanding work!', rating: 5, featured: true },
      { name: 'Satya Nadella', role: 'CEO', company: 'Cloud Systems', quote: 'Their AI expertise is second to none. A pleasure to work with.', rating: 5, featured: true },
      { name: 'Sundar Pichai', role: 'CEO', company: 'Search Engine Inc', quote: 'Highly recommended for complex enterprise projects.', rating: 4 },
      { name: 'Elon Musk', role: 'CTO', company: 'Space Explorers', quote: 'Fast, efficient, and reliable. Exactly what we needed.', rating: 5 },
      { name: 'Mark Zuckerberg', role: 'CEO', company: 'Social Network', quote: 'The best design team I have ever worked with.', rating: 5 }
    ]);
    console.log('✅ Testimonials seeded');

    // Seed Newsletter
    await Newsletter.create([
      { email: 'sub1@gmail.com' }, { email: 'sub2@gmail.com' }, { email: 'sub3@gmail.com' },
      { email: 'sub4@gmail.com' }, { email: 'sub5@gmail.com' }, { email: 'sub6@gmail.com' },
      { email: 'sub7@gmail.com' }, { email: 'sub8@gmail.com' }, { email: 'sub9@gmail.com' },
      { email: 'sub10@gmail.com' }
    ]);
    console.log('✅ Newsletter subscribers seeded');

    // Seed Chat Messages
    await ChatMessage.create([
      { sessionId: 'session_1', sender: 'user', message: 'Hello, are you there?' },
      { sessionId: 'session_1', sender: 'bot', message: 'Yes, how can I help you today?' },
      { sessionId: 'session_2', sender: 'user', message: 'What are your pricing tiers?' },
      { sessionId: 'session_3', sender: 'user', message: 'I want to build a mobile app.' },
      { sessionId: 'session_3', sender: 'bot', message: 'We specialize in React Native and Flutter!' }
    ]);
    console.log('✅ Chat messages seeded');

    // Seed Settings
    await Settings.create([
      { key: 'site_name', value: 'ScalexDevs', group: 'general' },
      { key: 'contact_email', value: 'hello@scalexdevs.com', group: 'general' },
      { key: 'github_url', value: 'https://github.com/scalexdevs', group: 'social' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/scalexdevs', group: 'social' }
    ]);
    console.log('✅ Site settings seeded');

    console.log('🎉 Database seeded successfully!');
    console.log('👉 Visit http://localhost:3000/dashboard to see your data');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seed();
