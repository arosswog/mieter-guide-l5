import Link from "next/link";
import { apartments, common } from "@/data/apartments";
import { getLanguageFromSearchParams, withLanguage } from "@/lib/language";

export default async function EGPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);
  const data = apartments.eg;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href={withLanguage("/", language)}
              className="text-sm text-stone-500 transition hover:text-stone-800"
            >
              ← Zur Übersicht
            </Link>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-stone-500">
              Apartment Guide
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              {data.name}
            </h1>
            <p className="mt-2 text-stone-600">{data.subtitle}</p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-stone-200">
            <p className="text-sm text-stone-500">Adresse</p>
            <p className="mt-1 font-medium">{data.address}</p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
              Willkommen
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              Schön, dass Sie da sind.
            </h2>
            <p className="mt-4 leading-7 text-stone-600">{data.special}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-50 p-5">
                <p className="text-sm text-stone-500">Check-in</p>
                <p className="mt-1 text-lg font-semibold">{data.checkin}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-5">
                <p className="text-sm text-stone-500">Check-out</p>
                <p className="mt-1 text-lg font-semibold">{data.checkout}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-stone-900 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-300">
              WLAN
            </p>
            <p className="mt-4 text-sm text-stone-300">Netzwerkname</p>
            <p className="text-xl font-semibold">{data.wifi}</p>

            <p className="mt-6 text-sm text-stone-300">Passwort</p>
            <p className="text-xl font-semibold">{data.password}</p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h3 className="text-lg font-semibold">Hausregeln</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {common.rules}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h3 className="text-lg font-semibold">Lüften</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {common.ventilation}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h3 className="text-lg font-semibold">Mülltrennung</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {common.waste}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h3 className="text-lg font-semibold">Parken</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {data.parking}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 md:col-span-2 xl:col-span-2">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {common.contactName}
              <br />
              <a
                href={`mailto:${common.contactMail}`}
                className="text-stone-800 underline underline-offset-4"
              >
                {common.contactMail}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
