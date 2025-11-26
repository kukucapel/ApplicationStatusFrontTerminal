import { decrypt } from '@/lib/aes256';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const encrypted = url.searchParams.get('encrypted');
  if (!encrypted) return new Response('No data', { status: 400 });

  const person = decrypt(encrypted);
  return new Response(JSON.stringify(person), { status: 200 });
}
