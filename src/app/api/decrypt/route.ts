import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/aes256';

export async function POST(req: Request) {
  try {
    const { personal } = await req.json();

    if (!personal) {
      return NextResponse.json(
        { error: 'No personal field provided' },
        { status: 400 }
      );
    }

    const result = decrypt(personal);

    return NextResponse.json(result);
  } catch (e: any) {
    console.error('Decrypt API error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
