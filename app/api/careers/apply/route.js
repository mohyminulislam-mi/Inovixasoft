import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.email || !data.firstName || !data.lastName || !data.jobId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const application = await Application.create({
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      portfolioUrl: data.portfolioUrl,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      experience: data.experience,
      coverLetter: data.coverLetter,
      skills: data.skills,
      availability: data.availability,
      salary: data.salary
    });

    return NextResponse.json({ success: true, applicationId: application._id });
  } catch (error) {
    console.error('Career Application API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
