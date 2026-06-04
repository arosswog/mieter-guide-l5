'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MdArrowBack, MdOpenInNew } from 'react-icons/md';
import Footer from './Footer';

interface Place {
  name: string;
  description?: string;
  distance?: string;
  url?: string;
}

function isPlace(value: unknown): value is Place {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).name === 'string'
  );
}

interface PageProps {
  section: 'wlan' | 'checkin' | 'hausregeln' | 'einkauf' | 'muell' | 'sehenswuerdigkeiten' | 'verkehr' | 'kontakt' | 'og' | 'eg';
}

export default function PageTemplate({ section }: PageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const data = t.raw(section) as Record<string, unknown>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition"
        >
          <MdArrowBack className="text-xl" />
          Zurück zur Startseite
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-stone-900 mb-3">
            {String(data.title)}
          </h1>
          <p className="text-lg text-stone-600">
            {String(data.description)}
          </p>
        </header>

        <article className="bg-white rounded-3xl shadow-sm ring-1 ring-stone-200 p-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6">
            {String(data.heading)}
          </h2>

          <div className="space-y-8">
            {Object.entries(data).map(([key, value]: [string, unknown]) => {
              if (['title', 'description', 'heading'].includes(key)) return null;

              if (typeof value === 'string') {
                return (
                  <div key={key}>
                    <h3 className="text-lg font-semibold text-stone-800 mb-3">
                      {value}
                    </h3>
                  </div>
                );
              }

              if (Array.isArray(value)) {
                if (value.length > 0 && isPlace(value[0])) {
                  return (
                    <div key={key} className="grid gap-4 sm:grid-cols-2">
                      {(value as Place[]).map((place, idx: number) => {
                        const card = (
                          <div className="h-full rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-5 transition hover:shadow-md hover:ring-stone-300">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-base font-semibold text-stone-900">
                                {place.name}
                              </h3>
                              <div className="flex shrink-0 items-center gap-2">
                                {place.distance && (
                                  <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                                    {place.distance}
                                  </span>
                                )}
                                {place.url && (
                                  <MdOpenInNew className="text-lg text-stone-500" aria-hidden />
                                )}
                              </div>
                            </div>
                            {place.description && (
                              <p className="mt-2 text-sm leading-6 text-stone-600">
                                {place.description}
                              </p>
                            )}
                          </div>
                        );

                        return place.url ? (
                          <a
                            key={idx}
                            href={place.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-2xl"
                          >
                            {card}
                          </a>
                        ) : (
                          <div key={idx}>{card}</div>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <ul key={key} className="space-y-2">
                    {(value as unknown[]).map((item, idx: number) => (
                      <li key={idx} className="flex gap-3 text-stone-700">
                        <span className="text-stone-900 font-bold min-w-6">•</span>
                        <span>{String(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200">
            <Link
              href={`/${locale}`}
              className="inline-block bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-700 transition"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
          
          <Footer />
        </article>
      </div>
    </main>
  );
}
