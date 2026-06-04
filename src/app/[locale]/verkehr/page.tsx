'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  MdArrowBack,
  MdOpenInNew,
  MdDirectionsBus,
  MdTram,
  MdTrain,
  MdInfoOutline,
  MdConfirmationNumber,
  MdPlace,
} from 'react-icons/md';
import Departures from '@/lib/Departures';
import Footer from '@/lib/Footer';

interface BusStop {
  name: string;
  lines?: string[];
  distance?: string;
  description?: string;
  url?: string;
  urlLabel?: string;
}

interface TransitLine {
  code: string;
  name: string;
}

interface InfoLink {
  name: string;
  description?: string;
  url: string;
}

interface VerkehrData {
  title: string;
  description: string;
  heading: string;
  intro?: string;
  heroAlt?: string;
  backLabel?: string;
  live?: {
    stop?: string;
    lines?: string[];
    vvsUrl?: string;
    heading?: string;
    boards?: {
      stop: string;
      lines: string[];
      direction?: string;
      heading?: string;
      subtitle?: string;
      empty?: string;
    }[];
  };
  stops?: {
    heading: string;
    subtitle?: string;
    list: BusStop[];
  };
  stadtbahn?: {
    heading: string;
    badge?: string;
    name: string;
    description: string;
    points?: string[];
    url?: string;
    urlLabel?: string;
    imageAlt?: string;
  };
  bahnhof?: {
    heading: string;
    name: string;
    description: string;
    lines?: TransitLine[];
    points?: string[];
    url?: string;
    urlLabel?: string;
    imageAlt?: string;
  };
  links?: {
    heading: string;
    subtitle?: string;
    list: InfoLink[];
  };
  tickets?: {
    heading: string;
    description?: string;
    points?: string[];
  };
}

export default function VerkehrPage() {
  const t = useTranslations();
  const locale = useLocale();
  const data = t.raw('verkehr') as VerkehrData;
  const backLabel = data.backLabel ?? 'Zurück zur Startseite';

  const liveVvsUrl =
    data.live?.vvsUrl ?? 'https://www.vvs.de/verbindungen-und-mobilitaet/fahrplanauskunft';
  const liveBoards =
    data.live?.boards && data.live.boards.length > 0
      ? data.live.boards
      : [
          {
            stop: data.live?.stop ?? 'Ludwigsburg Oßweil Comburgstraße',
            lines: data.live?.lines ?? ['425', '431'],
          },
        ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition"
        >
          <MdArrowBack className="text-xl" />
          {backLabel}
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-stone-900 mb-3">{data.title}</h1>
          <p className="text-lg text-stone-600">{data.description}</p>
        </header>

        <article className="bg-white rounded-3xl shadow-sm ring-1 ring-stone-200 p-6 sm:p-8">
          <div className="mb-8 overflow-hidden rounded-2xl ring-1 ring-stone-200">
            <Image
              src="/images/verkehr-hero.svg"
              alt={data.heroAlt ?? data.title}
              width={1200}
              height={420}
              className="h-auto w-full"
              priority
            />
          </div>

          <h2 className="text-2xl font-semibold text-stone-900 mb-4">{data.heading}</h2>
          {data.intro && (
            <p className="mb-8 text-base leading-7 text-stone-600">{data.intro}</p>
          )}

          {/* Live-Abfahrten */}
          <section className="mb-10 space-y-4">
            {liveBoards.map((board, idx) => (
              <Departures
                key={idx}
                stop={board.stop}
                lines={board.lines}
                direction={board.direction}
                heading={board.heading}
                subtitle={board.subtitle}
                empty={board.empty}
                vvsUrl={liveVvsUrl}
              />
            ))}
          </section>

          {/* Bushaltestellen in der Nähe */}
          {data.stops && (
            <section className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <MdDirectionsBus className="text-xl" aria-hidden />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">{data.stops.heading}</h2>
                  {data.stops.subtitle && (
                    <p className="text-sm text-stone-500">{data.stops.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.stops.list.map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex h-full flex-col rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200 transition hover:shadow-md hover:ring-stone-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <MdPlace className="mt-0.5 text-lg text-green-600" aria-hidden />
                        <h3 className="text-base font-semibold text-stone-900">{stop.name}</h3>
                      </div>
                      {stop.distance && (
                        <span className="shrink-0 rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                          {stop.distance}
                        </span>
                      )}
                    </div>
                    {stop.lines && stop.lines.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {stop.lines.map((line) => (
                          <span
                            key={line}
                            className="rounded-md bg-green-600 px-2 py-0.5 text-xs font-bold text-white"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    )}
                    {stop.description && (
                      <p className="mt-3 text-sm leading-6 text-stone-600">{stop.description}</p>
                    )}
                    {stop.url && (
                      <a
                        href={stop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800"
                      >
                        {stop.urlLabel ?? stop.url}
                        <MdOpenInNew className="text-sm" aria-hidden />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Stadtbahn U12 */}
          {data.stadtbahn && (
            <section className="mb-10">
              <div className="overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-200">
                <div className="grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
                  <Image
                    src="/images/verkehr-tram.svg"
                    alt={data.stadtbahn.imageAlt ?? data.stadtbahn.name}
                    width={400}
                    height={260}
                    className="h-full w-full object-cover"
                  />
                  <div className="p-5 sm:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <MdTram className="text-xl" aria-hidden />
                      </span>
                      {data.stadtbahn.badge && (
                        <span className="rounded-md bg-violet-700 px-2 py-0.5 text-sm font-bold text-white">
                          {data.stadtbahn.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-stone-900">
                      {data.stadtbahn.heading}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {data.stadtbahn.description}
                    </p>
                    {data.stadtbahn.points && data.stadtbahn.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {data.stadtbahn.points.map((point, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-stone-700">
                            <span className="font-bold text-violet-600">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {data.stadtbahn.url && (
                      <a
                        href={data.stadtbahn.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-800"
                      >
                        {data.stadtbahn.urlLabel ?? data.stadtbahn.url}
                        <MdOpenInNew className="text-sm" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Bahnhof Ludwigsburg */}
          {data.bahnhof && (
            <section className="mb-10">
              <div className="overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-200">
                <div className="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="order-2 p-5 sm:order-1 sm:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                        <MdTrain className="text-xl" aria-hidden />
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-stone-900">{data.bahnhof.heading}</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {data.bahnhof.description}
                    </p>
                    {data.bahnhof.lines && data.bahnhof.lines.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {data.bahnhof.lines.map((line) => (
                          <div key={line.code} className="flex items-center gap-2 text-sm">
                            <span className="min-w-10 rounded-md bg-sky-600 px-2 py-0.5 text-center text-xs font-bold text-white">
                              {line.code}
                            </span>
                            <span className="text-stone-700">{line.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {data.bahnhof.points && data.bahnhof.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {data.bahnhof.points.map((point, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-stone-700">
                            <span className="font-bold text-sky-600">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {data.bahnhof.url && (
                      <a
                        href={data.bahnhof.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800"
                      >
                        {data.bahnhof.urlLabel ?? data.bahnhof.url}
                        <MdOpenInNew className="text-sm" aria-hidden />
                      </a>
                    )}
                  </div>
                  <Image
                    src="/images/verkehr-train.svg"
                    alt={data.bahnhof.imageAlt ?? data.bahnhof.name}
                    width={400}
                    height={260}
                    className="order-1 h-full w-full object-cover sm:order-2"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Tickets & Tarif */}
          {data.tickets && (
            <section className="mb-10">
              <div className="flex gap-3 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
                <MdConfirmationNumber
                  className="mt-0.5 shrink-0 text-2xl text-amber-600"
                  aria-hidden
                />
                <div>
                  <h2 className="text-lg font-semibold text-stone-900">{data.tickets.heading}</h2>
                  {data.tickets.description && (
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      {data.tickets.description}
                    </p>
                  )}
                  {data.tickets.points && data.tickets.points.length > 0 && (
                    <ul className="mt-2 space-y-1.5">
                      {data.tickets.points.map((point, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-stone-700">
                          <span className="font-bold text-amber-600">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Weitere Infos / Links */}
          {data.links && (
            <section className="mb-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <MdInfoOutline className="text-xl" aria-hidden />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">{data.links.heading}</h2>
                  {data.links.subtitle && (
                    <p className="text-sm text-stone-500">{data.links.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.links.list.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3 rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200 transition hover:shadow-md hover:ring-blue-300"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900">{link.name}</h3>
                      {link.description && (
                        <p className="mt-1 text-xs leading-5 text-stone-600">{link.description}</p>
                      )}
                    </div>
                    <MdOpenInNew
                      className="mt-0.5 shrink-0 text-lg text-stone-400 transition group-hover:text-blue-600"
                      aria-hidden
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t border-stone-200">
            <Link
              href={`/${locale}`}
              className="inline-block bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-700 transition"
            >
              ← {backLabel}
            </Link>
          </div>

          <Footer />
        </article>
      </div>
    </main>
  );
}
