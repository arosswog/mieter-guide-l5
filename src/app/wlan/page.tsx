import deMessages from "../../../messages/de.json";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";
import plMessages from "../../../messages/pl.json";
import zhMessages from "../../../messages/zh.json";
import { getLanguageFromSearchParams, type Language } from "@/lib/language";

const translationsByLanguage: Record<Language, typeof deMessages> = {
  de: deMessages,
  en: enMessages,
  fr: frMessages,
  pl: plMessages,
  zh: zhMessages,
};

export default async function WlanPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);
  const messages = translationsByLanguage[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-8 mt-10">
        <h1 className="text-2xl font-bold mb-4">{messages.title}</h1>
        <p className="text-base text-stone-700">{messages.content}</p>
      </div>
    </main>
  );
}
