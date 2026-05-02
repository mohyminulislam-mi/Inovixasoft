import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await Newsletter.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
