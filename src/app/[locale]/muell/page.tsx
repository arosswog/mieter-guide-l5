'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  MdArrowBack,
  MdRecycling,
  MdLightbulbOutline,
} from 'react-icons/md';
import WasteCalendar from '@/lib/WasteCalendar';
import Footer from '@/lib/Footer';

interface InfoSection {
  heading: string;
  list: string[];
}

interface MuellData {
  title: string;
  description: string;
  heading: string;
  intro?: string;
  backLabel?: string;
  live?: {
    days?: number;
    avlUrl?: string;
  };
  separation?: InfoSection;
  tips?: InfoSection;
}

const DEFAULT_AVL_URL = 'https://www.avl-ludwigsburg.de/abfuhrkalender';

export default function MuellPage() {
  const t = useTranslations();
  const locale = useLocale();
  const data = t.raw('muell') as MuellData;
  const backLabel = data.backLabel ?? 'Zurück zur Startseite';

  const days = data.live?.days ?? 60;
  const avlUrl = data.live?.avlUrl ?? DEFAULT_AVL_URL;

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
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">{data.heading}</h2>
          {data.intro && (
            <p className="mb-8 text-base leading-7 text-stone-600">{data.intro}</p>
          )}

          {/* Live-Abholtermine */}
          <section className="mb-10">
            <WasteCalendar days={days} avlUrl={avlUrl} />
          </section>

          {/* Mülltrennung */}
          {data.separation && (
            <section className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <MdRecycling className="text-xl" aria-hidden />
                </span>
                <h2 className="text-xl font-semibold text-stone-900">{data.separation.heading}</h2>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {data.separation.list.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-stone-700 ring-1 ring-stone-200"
                  >
                    <span className="font-bold text-green-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tipps */}
          {data.tips && (
            <section className="mb-2">
              <div className="flex gap-3 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
                <MdLightbulbOutline
                  className="mt-0.5 shrink-0 text-2xl text-amber-600"
                  aria-hidden
                />
                <div>
                  <h2 className="text-lg font-semibold text-stone-900">{data.tips.heading}</h2>
                  <ul className="mt-2 space-y-1.5">
                    {data.tips.list.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-stone-700">
                        <span className="font-bold text-amber-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
