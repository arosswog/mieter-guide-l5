'use client';

import type { IconType } from 'react-icons';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  MdArrowBack,
  MdOpenInNew,
  MdBakeryDining,
  MdLocalGroceryStore,
  MdShoppingCart,
  MdLocalPharmacy,
  MdContentCut,
  MdAccountBalance,
  MdKebabDining,
  MdLunchDining,
  MdStorefront,
  MdLocalGasStation,
  MdLocalPolice,
  MdLocalFireDepartment,
  MdMedicalServices,
  MdLocalHospital,
  MdEmail,
  MdWifi,
  MdVpnKey,
  MdTv,
  MdBluetoothAudio,
  MdUsb,
  MdWaterDamage,
  MdThermostat,
  MdRouter,
} from 'react-icons/md';
import Footer from './Footer';

interface Place {
  name: string;
  description?: string;
  distance?: string;
  url?: string;
  icon?: string;
}

const placeIcons: Record<string, { Icon: IconType; className: string }> = {
  bakery: { Icon: MdBakeryDining, className: 'bg-amber-100 text-amber-700' },
  supermarket: { Icon: MdLocalGroceryStore, className: 'bg-green-100 text-green-700' },
  discounter: { Icon: MdShoppingCart, className: 'bg-red-100 text-red-600' },
  pharmacy: { Icon: MdLocalPharmacy, className: 'bg-rose-100 text-rose-600' },
  hairdresser: { Icon: MdContentCut, className: 'bg-purple-100 text-purple-700' },
  bank: { Icon: MdAccountBalance, className: 'bg-blue-100 text-blue-700' },
  doener: { Icon: MdKebabDining, className: 'bg-orange-100 text-orange-600' },
  butcher: { Icon: MdLunchDining, className: 'bg-red-100 text-red-700' },
  gasstation: { Icon: MdLocalGasStation, className: 'bg-yellow-100 text-yellow-700' },
  shop: { Icon: MdStorefront, className: 'bg-stone-200 text-stone-700' },
  police: { Icon: MdLocalPolice, className: 'bg-blue-100 text-blue-700' },
  fire: { Icon: MdLocalFireDepartment, className: 'bg-red-100 text-red-600' },
  ambulance: { Icon: MdMedicalServices, className: 'bg-rose-100 text-rose-600' },
  doctor: { Icon: MdMedicalServices, className: 'bg-teal-100 text-teal-700' },
  hospital: { Icon: MdLocalHospital, className: 'bg-sky-100 text-sky-700' },
  mail: { Icon: MdEmail, className: 'bg-indigo-100 text-indigo-700' },
  tv: { Icon: MdTv, className: 'bg-indigo-100 text-indigo-700' },
  speaker: { Icon: MdBluetoothAudio, className: 'bg-blue-100 text-blue-700' },
  charger: { Icon: MdUsb, className: 'bg-emerald-100 text-emerald-700' },
  detector: { Icon: MdWaterDamage, className: 'bg-red-100 text-red-600' },
  sensor: { Icon: MdThermostat, className: 'bg-amber-100 text-amber-700' },
  repeater: { Icon: MdRouter, className: 'bg-violet-100 text-violet-700' },
};

interface WifiNetwork {
  ssidLabel: string;
  ssid: string;
  passwordLabel: string;
  password: string;
}

function isWifiNetwork(value: unknown): value is WifiNetwork {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).ssid === 'string' &&
    typeof (value as Record<string, unknown>).password === 'string'
  );
}

function isPlace(value: unknown): value is Place {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).name === 'string'
  );
}

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

        <article className="bg-white rounded-3xl shadow-sm ring-1 ring-stone-200 p-8">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6">
            {String(data.heading)}
          </h2>

          <div className="space-y-8">
            {Object.entries(data).map(([key, value]: [string, unknown]) => {
              if (['title', 'description', 'heading'].includes(key)) return null;

              if (isWifiNetwork(value)) {
                return (
                  <div
                    key={key}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-5 text-white shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                        <MdWifi className="text-xl" aria-hidden />
                        {value.ssidLabel}
                      </div>
                      <p className="mt-2 break-words font-mono text-xl font-semibold">
                        {value.ssid}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                        <MdVpnKey className="text-xl" aria-hidden />
                        {value.passwordLabel}
                      </div>
                      <p className="mt-2 break-words font-mono text-xl font-semibold">
                        {value.password}
                      </p>
                    </div>
                  </div>
                );
              }

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
                        const iconEntry =
                          (place.icon && placeIcons[place.icon]) || null;
                        const card = (
                          <div className="h-full rounded-2xl bg-stone-50 ring-1 ring-stone-200 p-5 transition hover:shadow-md hover:ring-stone-300">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                {iconEntry && (
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconEntry.className}`}
                                    aria-hidden
                                  >
                                    <iconEntry.Icon className="text-xl" />
                                  </span>
                                )}
                                <h3 className="text-base font-semibold text-stone-900">
                                  {place.name}
                                </h3>
                              </div>
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
