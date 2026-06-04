'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MdDirectionsBus, MdRefresh, MdOpenInNew, MdAccessTime } from 'react-icons/md';

interface Departure {
  line: string;
  destination: string;
  countdownMin: number;
  delayMin: number;
  realtime: boolean;
}

interface DeparturesResponse {
  stopName?: string;
  departures?: Departure[];
  error?: string;
}

interface DeparturesProps {
  stop: string;
  lines: string[];
  vvsUrl: string;
  direction?: string;
  heading?: string;
  subtitle?: string;
  empty?: string;
}

const REFRESH_INTERVAL_MS = 60000;

export default function Departures({
  stop,
  lines,
  vvsUrl,
  direction,
  heading,
  subtitle,
  empty,
}: DeparturesProps) {
  const t = useTranslations('verkehr.live');
  const [departures, setDepartures] = useState<Departure[] | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const linesKey = useMemo(() => lines.join(','), [lines]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const params = new URLSearchParams({ stop, lines: linesKey });
        if (direction) params.set('direction', direction);
        const res = await fetch(`/api/departures?${params.toString()}`, { cache: 'no-store' });
        const data: DeparturesResponse = await res.json();
        if (cancelled) return;
        if (!res.ok || data.error) {
          setStatus('error');
          return;
        }
        setDepartures(data.departures ?? []);
        setUpdatedAt(new Date());
        setStatus('ok');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [stop, linesKey, direction, reloadKey]);

  const formatCountdown = (min: number) =>
    min <= 0 ? t('now') : `${min} ${t('minuteShort')}`;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 text-white shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <MdDirectionsBus className="text-2xl" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-tight">{heading ?? t('heading')}</h3>
            <p className="text-sm text-white/80">{subtitle ?? t('subtitle')}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus('loading');
            setReloadKey((key) => key + 1);
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label={t('refresh')}
        >
          <MdRefresh className="text-xl" aria-hidden />
        </button>
      </div>

      <div className="mt-5 space-y-2">
        {status === 'loading' && (
          <p className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/90">{t('loading')}</p>
        )}

        {status === 'error' && (
          <p className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/90">{t('error')}</p>
        )}

        {status === 'ok' && departures && departures.length === 0 && (
          <p className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white/90">{empty ?? t('empty')}</p>
        )}

        {status === 'ok' &&
          departures &&
          departures.map((dep, idx) => (
            <div
              key={`${dep.line}-${dep.destination}-${idx}`}
              className="flex items-center gap-3 rounded-xl bg-white/12 px-3 py-2.5 backdrop-blur-sm"
            >
              <span className="flex min-w-12 justify-center rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-purple-700">
                {dep.line}
              </span>
              <span className="flex-1 truncate text-sm font-medium">
                {t('towards')} {dep.destination}
              </span>
              {dep.delayMin > 0 && (
                <span className="rounded-full bg-amber-300/90 px-2 py-0.5 text-xs font-semibold text-amber-900">
                  +{dep.delayMin}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm font-semibold tabular-nums">
                <MdAccessTime className="text-base text-white/70" aria-hidden />
                {formatCountdown(dep.countdownMin)}
              </span>
            </div>
          ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
        <span>
          {updatedAt
            ? `${t('updated')} ${updatedAt.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : t('disclaimer')}
        </span>
        <a
          href={vvsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-white underline-offset-2 hover:underline"
        >
          {t('openLink')}
          <MdOpenInNew className="text-sm" aria-hidden />
        </a>
      </div>
    </div>
  );
}
