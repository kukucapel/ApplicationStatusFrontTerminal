import { NextResponse } from 'next/server';
import { triggerEvent } from '../stream/route';

export async function POST(req: Request) {
  const formData = await req.formData();
  const { searchParams } = new URL(req.url);
  const personal = formData.get('personal') || '';
  console.log(searchParams);
  if (searchParams.get('manual')) {
    return NextResponse.redirect(
      new URL(
        `${process.env.NEXT_PUBLIC_REDIRECT}/${searchParams.get(
          'manual'
        )}?personal=${encodeURIComponent(personal as string)}`,
        req.url
      )
    );
  }

  triggerEvent(String(personal));
  return NextResponse.json({ ok: true });
}
