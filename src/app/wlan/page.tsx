import { useTranslations } from 'next-intl';

export default function WlanPage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-8 mt-10">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <p className="text-base text-stone-700">{t('content')}</p>
      </div>
    </main>
  );
}
