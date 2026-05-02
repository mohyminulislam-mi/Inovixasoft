import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatMessage from '@/models/ChatMessage';

const KEYWORD_RESPONSES = [
  { 
    keywords: ['price', 'cost', 'how much', 'pricing'], 
    response: "Our custom software packages start from $999. You can view our detailed pricing at /pricing or book a free 30-minute consultation at /consultation to get a tailored quote." 
  },
  { 
    keywords: ['timeline', 'how long', 'duration', 'weeks'], 
    response: "Project timelines typically range from 2 to 12 weeks depending on the complexity. For a precise estimate based on your specific requirements, I'd recommend booking a call with our strategy team." 
  },
  { 
    keywords: ['service', 'offer', 'solutions', 'do you do'], 
    response: "We offer end-to-end digital solutions including Web App Development, Mobile Apps (iOS/Android), AI & Automation, SaaS architecture, and Technical SEO. You can explore them all at /services." 
  },
  { 
    keywords: ['hire', 'job', 'career', 'work at'], 
    response: "We're always looking for world-class talent! You can see all our current open positions and apply directly at /careers." 
  },
  { 
    keywords: ['contact', 'email', 'call', 'talk', 'human'], 
    response: "You can reach our human team directly at hello@scalexdevs.com or by booking a slot at /consultation. We typically reply to emails within 24 hours!" 
  }
];

export async function POST(req) {
  try {
    await dbConnect();
    const { sessionId, sender, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
    }

    // Save user message
    await ChatMessage.create({
      sessionId, sender, message
    });

    // Generate auto-response
    const lowerMsg = message.toLowerCase();
    let reply = "Thanks for reaching out! Our team has been notified and we'll get back to you within 24 hours. In the meantime, feel free to explore our /projects for inspiration.";

    for (const entry of KEYWORD_RESPONSES) {
      if (entry.keywords.some(k => lowerMsg.includes(k))) {
        reply = entry.response;
        break;
      }
    }

    // Save bot response
    await ChatMessage.create({
      sessionId, sender: 'bot', message: reply
    });

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
