import { NextResponse } from 'next/server';

let sendEvent: ((data: string) => void) | null = null;

export function GET() {
  return new Response(
    new ReadableStream({
      start(controller) {
        sendEvent = (data: string) => {
          controller.enqueue(`data: ${data}\n\n`);
        };
      },
      cancel() {
        sendEvent = null;
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    }
  );
}

// экспортируем для других api
export function triggerEvent(data: string) {
  if (sendEvent) sendEvent(data);
}
