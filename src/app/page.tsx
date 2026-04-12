import Link from "next/link";
import { MdWifi, MdLogin, MdHome, MdContactPhone, MdDirectionsTransit, MdShoppingCart, MdLocationOn } from "react-icons/md";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">
              Apartment Guide
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Lange Str. 5
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2 ml-2 md:ml-0">
            <button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm shadow-sm flex items-center gap-2">
  <span role="img" aria-label="Deutsch">🇩🇪</span> DE
</button>
<button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm shadow-sm flex items-center gap-2">
  <span role="img" aria-label="Englisch">🇬🇧</span> EN
</button>
<button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm shadow-sm flex items-center gap-2">
  <span role="img" aria-label="Französisch">🇫🇷</span> FR
</button>
<button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm shadow-sm flex items-center gap-2">
  <span role="img" aria-label="Japanisch">🇯🇵</span> JA
</button>
<button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm shadow-sm flex items-center gap-2">
  <span role="img" aria-label="Chinesisch">🇨🇳</span> ZH
</button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Willkommen
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              Alle wichtigen Informationen für Ihren Aufenthalt an einem Ort.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              WLAN, Check-in, Hausregeln, Geräte, Umgebung und Kontakt – klar,
              mobil optimiert und in mehreren Sprachen.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/og"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Zur OG-Wohnung
              </Link>
              <Link
                href="/eg"
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
              >
                Zur EG-Wohnung
              </Link>
		<Link
    		href="/muell"
    		className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
  		>
    		Müllabholung
  		</Link>
            </div>
          </div>

          <div className="rounded-3xl bg-stone-900 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-stone-300">
              Für Mieter
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-stone-200">
              <li>• Schneller Zugriff per QR-Code</li>
              <li>• Mehrsprachige Informationen</li>
              <li>• Mobil perfekt lesbar</li>
              <li>• Einfach später erweiterbar</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
  <Link href="/wlan" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
    <div className="flex flex-col items-center mb-2">
      <MdWifi className="text-4xl text-blue-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">WLAN & Technik</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Alle Zugänge, Gerätehinweise und technische Infos sauber an einem Ort.
    </p>
  </Link>
  <Link href="/checkin" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-green-300 focus:outline-none focus:ring-2 focus:ring-green-400">
    <div className="flex flex-col items-center mb-2">
      <MdLogin className="text-4xl text-green-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Check-in Infos</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Alles zum Ankommen: Schlüssel, Zeiten, Ablauf und erste Schritte.
    </p>
  </Link>
  <Link href="/hausregeln" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
    <div className="flex flex-col items-center mb-2">
      <MdHome className="text-4xl text-yellow-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Haus & Regeln</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Ruhezeiten, Mülltrennung, Lüften und wichtige Alltagshinweise verständlich erklärt.
    </p>
  </Link>
  <Link href="/kontakt" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400">
    <div className="flex flex-col items-center mb-2">
      <MdContactPhone className="text-4xl text-pink-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Kontakt & Hilfe</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Kontaktmöglichkeiten, Notfallinfos und Unterstützung bei Fragen direkt verfügbar.
    </p>
  </Link>
  <Link href="/verkehr" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
    <div className="flex flex-col items-center mb-2">
      <MdDirectionsTransit className="text-4xl text-purple-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Öffentliche Verkehrsmittel</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Infos zu Bus, Bahn und Anbindung in der Umgebung.
    </p>
  </Link>
  <Link href="/einkauf" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400">
    <div className="flex flex-col items-center mb-2">
      <MdShoppingCart className="text-4xl text-orange-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Einkaufsmöglichkeiten</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Supermärkte, Bäcker und weitere Geschäfte in der Nähe.
    </p>
  </Link>
  <Link href="/sehenswuerdigkeiten" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-400">
    <div className="flex flex-col items-center mb-2">
      <MdLocationOn className="text-4xl text-red-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">Sehenswürdigkeiten</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      Tipps zu Ausflugszielen und Highlights in der Umgebung.
    </p>
  </Link>
</section>
      </div>
    </main>
  );
}
