import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, company, service, budget, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const submission = await Contact.create({
      name, email, company, service, budget, message
    });

    return NextResponse.json({ success: true, submissionId: submission._id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
