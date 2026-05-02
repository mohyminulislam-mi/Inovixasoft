import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Consultation from "@/models/Consultation";
import Application from "@/models/Application";
import Job from "@/models/Job";
import Project from "@/models/Project";
import BlogPost from "@/models/BlogPost";
import Newsletter from "@/models/Newsletter";
import ChatMessage from "@/models/ChatMessage";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalContacts, 
      todayContacts, 
      newContacts,
      totalConsultations,
      pendingConsultations,
      totalApplications,
      pendingApplications,
      totalJobs,
      activeJobs,
      totalProjects,
      totalPosts,
      publishedPosts,
      totalNewsletter,
      chatSessions
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: today } }),
      Contact.countDocuments({ status: 'new' }),
      Consultation.countDocuments(),
      Consultation.countDocuments({ status: 'pending' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Job.countDocuments(),
      Job.countDocuments({ status: 'active' }),
      Project.countDocuments(),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'published' }),
      Newsletter.countDocuments(),
      ChatMessage.distinct('sessionId')
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts: { total: totalContacts, today: todayContacts, new: newContacts },
        consultations: { total: totalConsultations, pending: pendingConsultations },
        applications: { total: totalApplications, pending: pendingApplications },
        jobs: { total: totalJobs, active: activeJobs },
        projects: { total: totalProjects },
        blog: { total: totalPosts, published: publishedPosts },
        newsletter: { total: totalNewsletter },
        chat: { totalSessions: chatSessions.length }
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
