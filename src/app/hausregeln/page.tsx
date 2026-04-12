import Link from "next/link";
import { getLanguageFromSearchParams, withLanguage } from "@/lib/language";

export default async function HausregelnPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const language = await getLanguageFromSearchParams(searchParams);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href={withLanguage("/", language)}
          className="text-sm text-stone-500 transition hover:text-stone-800"
        >
          ← Zur Übersicht
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Hausregeln</h1>
        <p className="mt-3 text-stone-600">
          Die Hausregeln werden hier in Kürze ergänzt.
        </p>
      </div>
    </main>
  );
}
