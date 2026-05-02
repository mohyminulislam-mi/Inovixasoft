# ScalexDevs Admin Dashboard

A high-performance, professional admin dashboard for ScalexDevs built with Next.js, Tailwind CSS, and MongoDB.

## Features
- **Overview**: Real-time stats and activity charts.
- **Management**: Handle contacts, consultations, blog posts, projects, and careers.
- **Real-time**: Integrated live chat viewer.
- **Analytics**: Traffic and submission trends.
- **Health**: Database status and system diagnostics.
- **Modern UI**: Dark/Light mode, responsive sidebars, and smooth animations.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Charts**: Recharts
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB with Mongoose ODM
- **Theming**: next-themes

## Beginner Setup Guide

### STEP 1 — Install dependencies
```bash
npm install
```

### STEP 2 — Setup MongoDB Atlas (Free)
1. Go to [https://mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free account.
3. Create a new cluster (choose **FREE** tier).
4. Click "Connect" → "Drivers".
5. Copy the connection string.
6. Paste into `.env.local` as `MONGODB_URI`.
7. Replace `<password>` with your actual password.

### STEP 3 — Seed the database with sample data
```bash
npm run seed
```

### STEP 4 — Run the project
```bash
npm run dev
```

### STEP 5 — Open dashboard
Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Common Errors
- **"MongoServerError"**: Check your `MONGODB_URI` in `.env.local`.
- **"Module not found"**: Run `npm install` again.
- **"Port 3000 in use"**: Run `npx kill-port 3000`.

---
*Created with ScalexDevs Team*
