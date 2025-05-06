import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message, website } = await req.json();
    // Honeypot check
    if (website) {
      return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
    }
    // Fetch enabled webhooks from Strapi
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const webhookRes = await fetch(`${strapiUrl}/api/webhooks?filters[enabled][$eq]=true`);
    if (!webhookRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch webhooks.' }, { status: 500 });
    }
    const webhookData = await webhookRes.json();
    const webhooks = webhookData.data || [];
    if (!webhooks.length) {
      return NextResponse.json({ error: 'No webhooks configured.' }, { status: 500 });
    }
    const content = `**New Contact Message**\n**Name:** ${firstName} ${lastName}\n**Email:** ${email}\n**Phone:** ${phone || 'N/A'}\n**Message:**\n${message}`;
    let delivered = false;
    for (const webhook of webhooks) {
        console.log(webhook)
      const url = webhook?.url;
      if (!url) continue;
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        if (resp.ok) delivered = true;
      } catch (e) {
        // Ignore individual webhook errors
        console.error(`Failed to deliver message to webhook ${url}:`, e);
      }
    }
    if (!delivered) {
      return NextResponse.json({ error: 'Failed to deliver message to any webhook.' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error processing request:', e);
    return NextResponse.json({ error: `${e}` }, { status: 400 });
  }
}
