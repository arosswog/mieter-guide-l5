import { NextResponse } from 'next/server';
import { getWasteEvents } from '@/lib/waste';

// Abholtermine über den offenen AVL-Abfuhrkalender (ICS) für die Lange Str. 5.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(Math.max(Number(searchParams.get('days')) || 60, 1), 120);

  try {
    const events = await getWasteEvents(days);

    return NextResponse.json(
      {
        days,
        updatedAt: new Date().toISOString(),
        events,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    return NextResponse.json(
      { error: 'avl_unavailable', detail: message, days, events: [] },
      { status: 502 },
    );
  }
}
