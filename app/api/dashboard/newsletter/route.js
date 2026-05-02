import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function GET() {
  try {
    await dbConnect();
    const data = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const data = await Newsletter.create(body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids')?.split(',');

    if (id) {
      await Newsletter.findByIdAndDelete(id);
    } else if (ids) {
      await Newsletter.deleteMany({ _id: { $in: ids } });
    } else {
      return NextResponse.json({ success: false, message: "Missing id or ids" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
