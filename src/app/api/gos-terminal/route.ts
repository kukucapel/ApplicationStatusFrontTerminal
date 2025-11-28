import { NextResponse } from 'next/server';
import { triggerEvent } from '../stream/route';

export async function POST(req: Request) {
  const formData = await req.formData();
  const personal = formData.get('personal') || '';
  // Если нужно — можно обработать данные
  console.log(req);
  triggerEvent(String(personal));

  // return NextResponse.redirect(
  //   new URL(`http://192.168.8.12:3001/appointment?personal=${encoded}`, req.url)
  // );
  return NextResponse.json({ ok: true });
}
