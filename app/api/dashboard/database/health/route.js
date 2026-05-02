import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import mongoose from 'mongoose';
import Contact from "@/models/Contact";
import Consultation from "@/models/Consultation";
import Application from "@/models/Application";
import Job from "@/models/Job";
import Project from "@/models/Project";
import BlogPost from "@/models/BlogPost";
import Testimonial from "@/models/Testimonial";
import Newsletter from "@/models/Newsletter";
import ChatMessage from "@/models/ChatMessage";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();

    const collections = [
      { name: "contacts", model: Contact },
      { name: "consultations", model: Consultation },
      { name: "applications", model: Application },
      { name: "jobs", model: Job },
      { name: "projects", model: Project },
      { name: "blogposts", model: BlogPost },
      { name: "testimonials", model: Testimonial },
      { name: "newsletters", model: Newsletter },
      { name: "chatmessages", model: ChatMessage },
      { name: "settings", model: Settings }
    ];

    const collectionStats = await Promise.all(
      collections.map(async (col) => ({
        name: col.name,
        count: await col.model.countDocuments()
      }))
    );

    return NextResponse.json({
      success: true,
      data: {
        status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        dbName: mongoose.connection.name,
        dbType: "MongoDB",
        odm: "Mongoose",
        mongooseVersion: mongoose.version,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV,
        uptime: Math.floor(process.uptime()) + " seconds",
        collections: collectionStats,
        lastChecked: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
