import Link from "next/link";
import { MdWifi, MdLogin, MdHome, MdContactPhone, MdDirectionsTransit, MdShoppingCart, MdLocationOn } from "react-icons/md";
import { getLanguageFromSearchParams, type Language, withLanguage } from "@/lib/language";

const homeTranslations: Record<
  Language,
  {
    topLabel: string;
    welcomeLabel: string;
    welcomeTitle: string;
    welcomeDescription: string;
    toOg: string;
    toEg: string;
    wasteCollection: string;
    houseImageAlt: string;
    categories: {
      wifi: { title: string; short: string };
      checkin: { title: string; short: string };
      houseRules: { title: string; short: string };
      contact: { title: string; short: string };
      transport: { title: string; short: string };
      shopping: { title: string; short: string };
      sights: { title: string; short: string };
    };
  }
> = {
  de: {
    topLabel: "Apartment Guide",
    welcomeLabel: "Willkommen",
    welcomeTitle: "Alle wichtigen Informationen für Ihren Aufenthalt an einem Ort.",
    welcomeDescription:
      "WLAN, Check-in, Hausregeln, Geräte, Umgebung und Kontakt – klar, mobil optimiert und in mehreren Sprachen.",
    toOg: "Zur OG-Wohnung",
    toEg: "Zur EG-Wohnung",
    wasteCollection: "Müllabholung",
    houseImageAlt: "Haus 1890",
    categories: {
      wifi: {
        title: "WLAN & Technik",
        short: "Alle Zugänge, Gerätehinweise und technische Infos sauber an einem Ort.",
      },
      checkin: {
        title: "Check-in Infos",
        short: "Alles zum Ankommen: Schlüssel, Zeiten, Ablauf und erste Schritte.",
      },
      houseRules: {
        title: "Haus & Regeln",
        short: "Ruhezeiten, Mülltrennung, Lüften und wichtige Alltagshinweise verständlich erklärt.",
      },
      contact: {
        title: "Kontakt & Hilfe",
        short: "Kontaktmöglichkeiten, Notfallinfos und Unterstützung bei Fragen direkt verfügbar.",
      },
      transport: {
        title: "Öffentliche Verkehrsmittel",
        short: "Infos zu Bus, Bahn und Anbindung in der Umgebung.",
      },
      shopping: {
        title: "Einkaufsmöglichkeiten",
        short: "Supermärkte, Bäcker und weitere Geschäfte in der Nähe.",
      },
      sights: {
        title: "Sehenswürdigkeiten",
        short: "Tipps zu Ausflugszielen und Highlights in der Umgebung.",
      },
    },
  },
  en: {
    topLabel: "Apartment Guide",
    welcomeLabel: "Welcome",
    welcomeTitle: "All important information for your stay in one place.",
    welcomeDescription:
      "Wi-Fi, check-in, house rules, appliances, local area, and contact details — clear, mobile-optimized, and available in multiple languages.",
    toOg: "Upper-floor apartment",
    toEg: "Ground-floor apartment",
    wasteCollection: "Waste collection",
    houseImageAlt: "House 1890",
    categories: {
      wifi: {
        title: "Wi-Fi & Tech",
        short: "All access details, device notes, and technical info in one place.",
      },
      checkin: {
        title: "Check-in Info",
        short: "Everything for arrival: keys, times, process, and first steps.",
      },
      houseRules: {
        title: "House & Rules",
        short: "Quiet hours, waste separation, ventilation, and daily guidance explained clearly.",
      },
      contact: {
        title: "Contact & Help",
        short: "Contact options, emergency info, and support are directly available.",
      },
      transport: {
        title: "Public Transport",
        short: "Information about buses, trains, and local connections.",
      },
      shopping: {
        title: "Shopping",
        short: "Supermarkets, bakeries, and other nearby shops.",
      },
      sights: {
        title: "Sights",
        short: "Tips for excursions and highlights in the area.",
      },
    },
  },
  fr: {
    topLabel: "Guide de l'appartement",
    welcomeLabel: "Bienvenue",
    welcomeTitle: "Toutes les informations importantes pour votre séjour au même endroit.",
    welcomeDescription:
      "Wi-Fi, check-in, règles de la maison, équipements, environs et contact — clair, optimisé mobile et disponible en plusieurs langues.",
    toOg: "Appartement à l'étage",
    toEg: "Appartement au rez-de-chaussée",
    wasteCollection: "Collecte des déchets",
    houseImageAlt: "Maison 1890",
    categories: {
      wifi: {
        title: "Wi-Fi et technologie",
        short: "Tous les accès, indications sur les appareils et infos techniques au même endroit.",
      },
      checkin: {
        title: "Infos check-in",
        short: "Tout pour l'arrivée : clés, horaires, déroulement et premières étapes.",
      },
      houseRules: {
        title: "Maison et règles",
        short: "Heures de calme, tri des déchets, aération et consignes du quotidien clairement expliqués.",
      },
      contact: {
        title: "Contact et aide",
        short: "Coordonnées, infos d'urgence et assistance directement disponibles.",
      },
      transport: {
        title: "Transports publics",
        short: "Infos sur bus, train et liaisons dans les environs.",
      },
      shopping: {
        title: "Commerces",
        short: "Supermarchés, boulangeries et autres magasins à proximité.",
      },
      sights: {
        title: "Sites touristiques",
        short: "Conseils d'excursion et lieux incontournables dans les environs.",
      },
    },
  },
  ja: {
    topLabel: "アパートガイド",
    welcomeLabel: "ようこそ",
    welcomeTitle: "ご滞在に必要な情報を1か所にまとめました。",
    welcomeDescription:
      "Wi-Fi、チェックイン、ハウスルール、設備、周辺情報、連絡先を、分かりやすくモバイル最適化された形で多言語提供します。",
    toOg: "上階アパートへ",
    toEg: "1階アパートへ",
    wasteCollection: "ごみ収集",
    houseImageAlt: "1890年の家",
    categories: {
      wifi: {
        title: "Wi-Fiと技術",
        short: "接続情報、機器案内、技術情報を1か所で確認できます。",
      },
      checkin: {
        title: "チェックイン情報",
        short: "鍵、時間、手順、到着後の最初の流れをまとめています。",
      },
      houseRules: {
        title: "住居とルール",
        short: "静かな時間帯、ごみ分別、換気など日常の重要事項を分かりやすく説明します。",
      },
      contact: {
        title: "連絡先とサポート",
        short: "連絡方法、緊急情報、質問時のサポートをすぐに確認できます。",
      },
      transport: {
        title: "公共交通機関",
        short: "周辺のバス・電車・アクセス情報を案内します。",
      },
      shopping: {
        title: "買い物情報",
        short: "近くのスーパー、ベーカリー、その他の店舗情報です。",
      },
      sights: {
        title: "観光スポット",
        short: "周辺の見どころやお出かけ先のヒントを紹介します。",
      },
    },
  },
  zh: {
    topLabel: "公寓指南",
    welcomeLabel: "欢迎",
    welcomeTitle: "您的入住重要信息都在这里。",
    welcomeDescription:
      "无线网络、入住信息、房屋规则、设备说明、周边与联系方式——清晰展示，移动端友好，并支持多语言。",
    toOg: "前往楼上公寓",
    toEg: "前往一层公寓",
    wasteCollection: "垃圾回收",
    houseImageAlt: "1890号住宅",
    categories: {
      wifi: {
        title: "无线网络与技术",
        short: "所有访问方式、设备说明和技术信息集中在一处。",
      },
      checkin: {
        title: "入住信息",
        short: "到达所需信息：钥匙、时间、流程和第一步操作。",
      },
      houseRules: {
        title: "房屋与规则",
        short: "安静时间、垃圾分类、通风和日常重要提示都已清晰说明。",
      },
      contact: {
        title: "联系与帮助",
        short: "联系方式、紧急信息和问题支持可直接查看。",
      },
      transport: {
        title: "公共交通",
        short: "周边公交、火车和交通连接信息。",
      },
      shopping: {
        title: "购物信息",
        short: "附近超市、面包店及其他商店信息。",
      },
      sights: {
        title: "景点",
        short: "周边出游地点和亮点推荐。",
      },
    },
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);
  const t = homeTranslations[language];
  const languageButtons = [
    { code: "de", label: "DE", flag: "🇩🇪", ariaLabel: "Deutsch" },
    { code: "en", label: "EN", flag: "🇬🇧", ariaLabel: "English" },
    { code: "fr", label: "FR", flag: "🇫🇷", ariaLabel: "Français" },
    { code: "ja", label: "JA", flag: "🇯🇵", ariaLabel: "日本語" },
    { code: "zh", label: "中文", flag: "🇨🇳", ariaLabel: "中文" },
  ] as const;
  const getLanguageButtonClasses = (targetLanguage: string) =>
    `rounded-full border px-4 py-2 text-sm shadow-sm flex items-center gap-2 transition ${
      language === targetLanguage
        ? "border-stone-900 bg-stone-900 text-white"
        : "border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
    }`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-stone-500">
              {t.topLabel}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Haus 1890 / L5
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2 ml-2 md:ml-0">
            {languageButtons.map(({ code, label, flag, ariaLabel }) => (
              <Link
                key={code}
                href={withLanguage("/", code)}
                className={getLanguageButtonClasses(code)}
                aria-current={language === code ? "page" : undefined}
              >
                <span role="img" aria-label={ariaLabel}>{flag}</span> {label}
              </Link>
            ))}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              {t.welcomeLabel}
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              {t.welcomeTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              {t.welcomeDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withLanguage("/og", language)}
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                {t.toOg}
              </Link>
              <Link
                href={withLanguage("/eg", language)}
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
              >
                {t.toEg}
              </Link>
		<Link
    		href={withLanguage("/muell", language)}
    		className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
   		>
     		{t.wasteCollection}
   		</Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-0 shadow-lg ring-1 ring-stone-200 flex items-center justify-center h-full">
  <img
    src="/images/haus-1890.png"
    alt={t.houseImageAlt}
    className="w-full h-full rounded-3xl shadow-xl border-4 border-stone-200 object-cover"
    style={{ aspectRatio: 'auto 3/2', height: '100%', maxHeight: '600px', objectFit: 'cover' }}
  />
</div>
        </section>

        <section className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
  <Link href={withLanguage("/wlan", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
    <div className="flex flex-col items-center mb-2">
      <MdWifi className="text-4xl text-blue-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.wifi.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.wifi.short}
    </p>
  </Link>
  <Link href={withLanguage("/checkin", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-green-300 focus:outline-none focus:ring-2 focus:ring-green-400">
    <div className="flex flex-col items-center mb-2">
      <MdLogin className="text-4xl text-green-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.checkin.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.checkin.short}
    </p>
  </Link>
  <Link href={withLanguage("/hausregeln", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
    <div className="flex flex-col items-center mb-2">
      <MdHome className="text-4xl text-yellow-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.houseRules.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.houseRules.short}
    </p>
  </Link>
  <Link href={withLanguage("/kontakt", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400">
    <div className="flex flex-col items-center mb-2">
      <MdContactPhone className="text-4xl text-pink-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.contact.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.contact.short}
    </p>
  </Link>
  <Link href={withLanguage("/verkehr", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
    <div className="flex flex-col items-center mb-2">
      <MdDirectionsTransit className="text-4xl text-purple-600 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.transport.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.transport.short}
    </p>
  </Link>
  <Link href={withLanguage("/einkauf", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400">
    <div className="flex flex-col items-center mb-2">
      <MdShoppingCart className="text-4xl text-orange-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.shopping.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.shopping.short}
    </p>
  </Link>
  <Link href={withLanguage("/sehenswuerdigkeiten", language)} className="group rounded-2xl bg-white p-4 min-h-[110px] shadow-sm ring-1 ring-stone-200 transition hover:shadow-md hover:ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-400">
    <div className="flex flex-col items-center mb-2">
      <MdLocationOn className="text-4xl text-red-500 drop-shadow-sm mb-2 group-hover:scale-110 transition" />
      <h3 className="text-xl font-semibold text-center leading-tight">{t.categories.sights.title}</h3>
    </div>
    <p className="mt-1 text-xs leading-5 text-stone-600 text-center">
      {t.categories.sights.short}
    </p>
  </Link>
</section>
      </div>
    </main>
  );
}
