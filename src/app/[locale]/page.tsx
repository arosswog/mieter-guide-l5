'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MdWifi, MdLogin, MdHome, MdContactPhone, MdDirectionsTransit, MdShoppingCart, MdLocationOn, MdShoppingBag } from 'react-icons/md';

const langFlags = {
  de: { flag: '🇩🇪', name: 'Deutsch' },
  en: { flag: '🇬🇧', name: 'English' },
  fr: { flag: '🇫🇷', name: 'Français' },
  ja: { flag: '🇯🇵', name: '日本語' },
  zh: { flag: '🇨🇳', name: '中文' },
};

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">
              {t('subtitle')}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              {t('title')}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2 ml-2 md:ml-0">
            {Object.entries(langFlags).map(([lang, { flag }]) => (
              <a
                key={lang}
                href={`/${lang}`}
                className={`rounded-full border px-4 py-2 text-sm shadow-sm flex items-center gap-2 transition cursor-pointer ${
                  locale === lang
                    ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                    : 'border-stone-300 bg-white hover:bg-stone-100 hover:shadow-md'
                }`}
              >
                <span role="img" aria-label={langFlags[lang as keyof typeof langFlags].name}>
                  {flag}
                </span>
                {lang.toUpperCase()}
              </a>
            ))}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              {t('welcome')}
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              {t('welcomeHeading')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              {t('welcomeDescription')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/og`}
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                {t('toOG')}
              </Link>
              <Link
                href={`/${locale}/eg`}
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
              >
                {t('toEG')}
              </Link>
              <Link
                href={`/${locale}/muell`}
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
              >
                {t('trash')}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-0 shadow-lg ring-1 ring-stone-200 flex items-center justify-center h-full">
            <img
              src="/images/haus-1890.png"
              alt={t('title')}
              className="w-full h-full rounded-3xl shadow-xl border-4 border-stone-200 object-cover"
              style={{ aspectRatio: 'auto 3/2', height: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
          <Link href={`/${locale}/wlan`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <div className="flex flex-col items-center mb-2">
              <MdWifi className="text-4xl text-blue-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.wlan')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('wlan.description')}
            </p>
          </Link>

          <Link href={`/${locale}/checkin`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-green-300 focus:outline-none focus:ring-2 focus:ring-green-400">
            <div className="flex flex-col items-center mb-2">
              <MdLogin className="text-4xl text-green-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.checkin')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('checkin.description')}
            </p>
          </Link>

          <Link href={`/${locale}/hausregeln`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <div className="flex flex-col items-center mb-2">
              <MdHome className="text-4xl text-yellow-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.hausregeln')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('hausregeln.description')}
            </p>
          </Link>

          <Link href={`/${locale}/kontakt`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400">
            <div className="flex flex-col items-center mb-2">
              <MdContactPhone className="text-4xl text-pink-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.kontakt')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('kontakt.description')}
            </p>
          </Link>

          <Link href={`/${locale}/verkehr`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <div className="flex flex-col items-center mb-2">
              <MdDirectionsTransit className="text-4xl text-purple-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.verkehr')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('verkehr.description')}
            </p>
          </Link>

          <Link href={`/${locale}/einkauf`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <div className="flex flex-col items-center mb-2">
              <MdShoppingCart className="text-4xl text-orange-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.einkauf')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('einkauf.description')}
            </p>
          </Link>

          <Link href={`/${locale}/muell`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-500">
            <div className="flex flex-col items-center mb-2">
              <MdShoppingBag className="text-4xl text-green-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.muell')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('muell.description')}
            </p>
          </Link>

          <Link href={`/${locale}/sehenswuerdigkeiten`} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-400">
            <div className="flex flex-col items-center mb-2">
              <MdLocationOn className="text-4xl text-red-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-center leading-tight">{t('nav.sehenswuerdigkeiten')}</h3>
            </div>
            <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
              {t('sehenswuerdigkeiten.description')}
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
