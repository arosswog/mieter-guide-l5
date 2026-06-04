'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { MdArrowBack, MdDirectionsWalk, MdMap } from 'react-icons/md';
import Footer from './Footer';
import { RESTAURANTS, estimateWalk, mapsRouteUrl } from './restaurantData';

interface PageProps {
  section: 'wlan' | 'checkin' | 'hausregeln' | 'einkauf' | 'muell' | 'sehenswuerdigkeiten' | 'restaurants' | 'verkehr' | 'kontakt' | 'og' | 'eg';
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

        {section === 'restaurants' && (
          <div className="mb-8 overflow-hidden rounded-3xl shadow-sm ring-1 ring-stone-200">
            <Image
              src="/images/restaurants-hero.svg"
              alt={String(data.title)}
              width={800}
              height={240}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <article className="bg-white rounded-3xl shadow-sm ring-1 ring-stone-200 p-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6">
            {String(data.heading)}
          </h2>

          <div className="space-y-8">
            {Object.entries(data).map(([key, value]: [string, unknown]) => {
              if (['title', 'description', 'heading', 'walkText', 'routeLabel'].includes(key)) return null;

              if (typeof value === 'string') {
                const restaurant = section === 'restaurants' ? RESTAURANTS[key] : undefined;
                return (
                  <div key={key}>
                    <h3 className="text-lg font-semibold text-stone-800 mb-3 flex items-center gap-3">
                      {restaurant && (
                        <Image
                          src={`/images/icon-${restaurant.icon}.svg`}
                          alt=""
                          aria-hidden="true"
                          width={36}
                          height={36}
                          className="shrink-0"
                        />
                      )}
                      <span>{value}</span>
                    </h3>
                  </div>
                );
              }

              if (Array.isArray(value)) {
                const baseKey = key.endsWith('List') ? key.slice(0, -4) : '';
                const restaurant =
                  section === 'restaurants' && baseKey ? RESTAURANTS[baseKey] : undefined;
                const walk = restaurant ? estimateWalk(restaurant) : null;
                const kmStr = walk
                  ? new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(walk.km)
                  : '';
                return (
                  <div key={key}>
                    <ul className="space-y-2">
                      {(value as unknown[]).map((item, idx: number) => (
                        <li key={idx} className="flex gap-3 text-stone-700">
                          <span className="text-stone-900 font-bold min-w-6">•</span>
                          <span>{String(item)}</span>
                        </li>
                      ))}
                    </ul>
                    {restaurant && walk && (
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 font-medium text-amber-800 ring-1 ring-amber-200">
                          <MdDirectionsWalk className="text-base" />
                          {t('restaurants.walkText', { km: kmStr, minutes: walk.minutes })}
                        </span>
                        <a
                          href={mapsRouteUrl(restaurant)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-amber-700 underline hover:text-amber-900"
                        >
                          <MdMap className="text-base" />
                          {t('restaurants.routeLabel')}
                        </a>
                      </div>
                    )}
                  </div>
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
