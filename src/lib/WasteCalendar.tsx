'use client';

import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { useLocale, useTranslations } from 'next-intl';
import {
  MdDeleteOutline,
  MdCompost,
  MdNewspaper,
  MdRecycling,
  MdLocalFlorist,
  MdEvent,
  MdRefresh,
  MdOpenInNew,
  MdCalendarMonth,
} from 'react-icons/md';

type WasteType = 'BT' | 'RT' | 'PT' | 'LT' | 'GT' | 'UNKNOWN';

interface WasteEvent {
  wasteType: WasteType;
  date: string;
  summary: string;
}

interface WasteResponse {
  days?: number;
  updatedAt?: string;
  events?: WasteEvent[];
  error?: string;
}

interface WasteCalendarProps {
  days: number;
  avlUrl: string;
}

interface WasteMeta {
  Icon: IconType;
  /** Solid badge (chip) styles. */
  badge: string;
  /** Small legend dot. */
  dot: string;
}

const WASTE_META: Record<WasteType, WasteMeta> = {
  RT: { Icon: MdDeleteOutline, badge: 'bg-stone-700 text-white', dot: 'bg-stone-700' },
  BT: { Icon: MdCompost, badge: 'bg-amber-700 text-white', dot: 'bg-amber-700' },
  PT: { Icon: MdNewspaper, badge: 'bg-blue-600 text-white', dot: 'bg-blue-600' },
  LT: { Icon: MdRecycling, badge: 'bg-yellow-400 text-yellow-950', dot: 'bg-yellow-400' },
  GT: { Icon: MdLocalFlorist, badge: 'bg-green-600 text-white', dot: 'bg-green-600' },
  UNKNOWN: { Icon: MdEvent, badge: 'bg-stone-400 text-white', dot: 'bg-stone-400' },
};

const TYPE_ORDER: WasteType[] = ['RT', 'BT', 'PT', 'LT', 'GT', 'UNKNOWN'];

const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6h – termine ändern sich selten

function parseLocalDate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function startOfToday(): number {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t.getTime();
}

interface DayGroup {
  date: string;
  types: WasteType[];
}

function groupByDate(events: WasteEvent[]): DayGroup[] {
  const map = new Map<string, Set<WasteType>>();
  for (const event of events) {
    if (!map.has(event.date)) map.set(event.date, new Set());
    map.get(event.date)!.add(event.wasteType);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, set]) => ({
      date,
      types: TYPE_ORDER.filter((type) => set.has(type)),
    }));
}

export default function WasteCalendar({ days, avlUrl }: WasteCalendarProps) {
  const t = useTranslations('muell.live');
  const locale = useLocale();
  const [events, setEvents] = useState<WasteEvent[] | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(`/api/waste?days=${days}`, { cache: 'no-store' });
        const data: WasteResponse = await res.json();
        if (cancelled) return;
        if (!res.ok || data.error) {
          setStatus('error');
          return;
        }
        setEvents(data.events ?? []);
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
  }, [days, reloadKey]);

  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dateFmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long' });

  const todayMs = startOfToday();
  const tomorrowMs = todayMs + 24 * 60 * 60 * 1000;

  const groups = events ? groupByDate(events) : [];

  function relativeLabel(date: Date): string | null {
    const ms = date.getTime();
    if (ms === todayMs) return t('today');
    if (ms === tomorrowMs) return t('tomorrow');
    return null;
  }

  return (
    <div className="overflow-hidden rounded-3xl ring-1 ring-stone-200 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-emerald-600 to-green-700 p-5 text-white sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <MdCalendarMonth className="text-2xl" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-tight">{t('heading')}</h3>
            <p className="text-sm text-white/80">{t('subtitle')}</p>
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

      <div className="bg-white p-4 sm:p-6">
        {/* Legende */}
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            {t('legendTitle')}
          </span>
          {TYPE_ORDER.filter((type) => type !== 'UNKNOWN').map((type) => {
            const meta = WASTE_META[type];
            return (
              <span key={type} className="flex items-center gap-1.5 text-sm text-stone-600">
                <span className={`h-3 w-3 rounded-full ${meta.dot}`} aria-hidden />
                {t(`types.${type}`)}
              </span>
            );
          })}
        </div>

        {status === 'loading' && (
          <p className="rounded-2xl bg-stone-50 px-4 py-6 text-center text-sm text-stone-500 ring-1 ring-stone-200">
            {t('loading')}
          </p>
        )}

        {status === 'error' && (
          <p className="rounded-2xl bg-amber-50 px-4 py-6 text-center text-sm text-amber-800 ring-1 ring-amber-200">
            {t('error')}
          </p>
        )}

        {status === 'ok' && groups.length === 0 && (
          <p className="rounded-2xl bg-stone-50 px-4 py-6 text-center text-sm text-stone-500 ring-1 ring-stone-200">
            {t('empty')}
          </p>
        )}

        {status === 'ok' && groups.length > 0 && (
          <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  <th scope="col" className="px-4 py-3">
                    {t('dateHeader')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('wasteHeader')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  const date = parseLocalDate(group.date);
                  const relative = relativeLabel(date);
                  const isSoon = date.getTime() <= tomorrowMs;
                  return (
                    <tr
                      key={group.date}
                      className={`border-t border-stone-100 align-top ${
                        isSoon ? 'bg-emerald-50/60' : 'odd:bg-white even:bg-stone-50/40'
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-stone-900">
                            {weekdayFmt.format(date)}, {dateFmt.format(date)}
                          </span>
                        </div>
                        {relative && (
                          <span className="mt-1 inline-block rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                            {relative}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {group.types.map((type) => {
                            const meta = WASTE_META[type];
                            return (
                              <span
                                key={type}
                                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${meta.badge}`}
                              >
                                <meta.Icon className="text-sm" aria-hidden />
                                {t(`types.${type}`)}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <span>
            {updatedAt
              ? `${t('updated')} ${updatedAt.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : t('disclaimer')}
          </span>
          <a
            href={avlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-emerald-700 underline-offset-2 hover:underline"
          >
            {t('openLink')}
            <MdOpenInNew className="text-sm" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
