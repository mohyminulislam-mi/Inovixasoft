import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Consultation from '@/models/Consultation';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.name || !data.email || !data.topic || !data.preferredDate) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const booking = await Consultation.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      topic: data.topic,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      timezone: data.timezone,
      notes: data.notes
    });

    return NextResponse.json({ success: true, bookingId: booking._id, message: 'Consultation booked successfully' });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
