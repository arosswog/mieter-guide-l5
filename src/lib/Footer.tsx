'use client';

export default function Footer() {
  // Diese Variablen werden beim Build gesetzt
  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION || 'dev';
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString();
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <footer className="px-6 py-6 text-center text-[11px] leading-5 text-stone-400">
      <p>
        Build {buildVersion} • {formatDate(buildDate)}
      </p>
    </footer>
  );
}
