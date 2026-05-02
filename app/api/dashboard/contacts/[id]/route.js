import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const data = await Contact.findById(params.id);
    if (!data) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const data = await Contact.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
