import { getRequestConfig } from "next-intl/server";

const locales = ["de", "en", "fr", "ja", "zh"] as const;
type Locale = typeof locales[number];

const defaultLocale: Locale = "de";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
