import { NextResponse } from 'next/server';

// Live-Abfahrten über die offene VVS/EFA-Fahrplanauskunft (Echtzeit).
// Standard: Haltestelle in Oßweil, Linien 425 & 431 in der Nähe der Lange Straße.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const EFA_BASE = 'https://www3.vvs.de/mngvvs';
const DEFAULT_STOP = 'Ludwigsburg Oßweil Comburgstraße';
const DEFAULT_LINES = ['425', '431'];
const REQUEST_TIMEOUT_MS = 8000;

interface Departure {
  line: string;
  destination: string;
  plannedTime: string | null;
  realTime: string | null;
  countdownMin: number;
  delayMin: number;
  realtime: boolean;
}

interface EfaTransportation {
  number?: string;
  disassembledName?: string;
  destination?: { name?: string };
}

interface EfaStopEvent {
  transportation?: EfaTransportation;
  departureTimePlanned?: string;
  departureTimeEstimated?: string;
  departureTimeBaseTimetable?: string;
  isRealtimeControlled?: boolean;
}

interface EfaLocation {
  id?: string;
  name?: string;
  disassembledName?: string;
  type?: string;
  isBest?: boolean;
}

async function efaFetch(path: string, params: Record<string, string>): Promise<unknown> {
  const query = new URLSearchParams({
    SpEncId: '0',
    coordOutputFormat: 'EPSG:4326',
    outputFormat: 'rapidJSON',
    locationServerActive: '1',
    ...params,
  }).toString();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${EFA_BASE}/${path}?${query}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'mieter-guide-lange-str (public transport widget)',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`EFA responded with ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function resolveStopId(query: string): Promise<{ id: string; name: string } | null> {
  // Falls bereits eine globale Halt-ID übergeben wurde, direkt verwenden.
  if (/^de:\d+:\d+/.test(query)) {
    return { id: query, name: query };
  }

  const data = (await efaFetch('XML_STOPFINDER_REQUEST', {
    type_sf: 'any',
    name_sf: query,
  })) as { locations?: EfaLocation[] };

  const locations = data.locations ?? [];
  const stop =
    locations.find((l) => l.type === 'stop' && l.isBest) ??
    locations.find((l) => l.type === 'stop') ??
    locations[0];

  if (!stop?.id) return null;
  return { id: stop.id, name: stop.disassembledName || stop.name || query };
}

function minutesUntil(iso: string | undefined): number | null {
  if (!iso) return null;
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return null;
  return Math.round((target - Date.now()) / 60000);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stopQuery = searchParams.get('stop') || DEFAULT_STOP;
  const linesParam = searchParams.get('lines');
  const lines = linesParam
    ? linesParam
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean)
    : DEFAULT_LINES;
  const limit = Math.min(Number(searchParams.get('limit')) || 8, 20);

  try {
    const stop = await resolveStopId(stopQuery);
    if (!stop) {
      return NextResponse.json(
        { error: 'stop_not_found', stopName: stopQuery, departures: [] },
        { status: 404 },
      );
    }

    const dmData = (await efaFetch('XML_DM_REQUEST', {
      depType: 'stopEvents',
      mode: 'direct',
      type_dm: 'stop',
      name_dm: stop.id,
      useRealtime: '1',
      limit: '40',
      includeCompleteStopSeq: '0',
      useProxFootSearch: '0',
    })) as { stopEvents?: EfaStopEvent[] };

    const stopEvents = dmData.stopEvents ?? [];

    const departures: Departure[] = stopEvents
      .map((event): Departure | null => {
        const transportation = event.transportation;
        const line = transportation?.disassembledName || transportation?.number || '';
        if (!line) return null;

        const planned = event.departureTimePlanned ?? event.departureTimeBaseTimetable ?? null;
        const real = event.departureTimeEstimated ?? null;
        const reference = real ?? planned ?? undefined;
        const countdown = minutesUntil(reference);
        if (countdown === null || countdown < 0) return null;

        const plannedMin = minutesUntil(planned ?? undefined);
        const realMin = minutesUntil(real ?? undefined);
        const delay = plannedMin !== null && realMin !== null ? realMin - plannedMin : 0;

        return {
          line,
          destination: transportation?.destination?.name ?? '',
          plannedTime: planned,
          realTime: real,
          countdownMin: countdown,
          delayMin: delay,
          realtime: Boolean(event.isRealtimeControlled && real),
        };
      })
      .filter((d): d is Departure => d !== null)
      .filter((d) => (lines.length ? lines.includes(d.line) : true))
      .sort((a, b) => a.countdownMin - b.countdownMin)
      .slice(0, limit);

    return NextResponse.json(
      {
        stopName: stop.name,
        stopId: stop.id,
        lines,
        updatedAt: new Date().toISOString(),
        departures,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    return NextResponse.json(
      { error: 'efa_unavailable', detail: message, stopName: stopQuery, departures: [] },
      { status: 502 },
    );
  }
}
