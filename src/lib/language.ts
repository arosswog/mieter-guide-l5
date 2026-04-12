export const SUPPORTED_LANGUAGES = ["de", "en", "fr", "pl", "zh"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

type SearchParamsInput = {
  lang?: string | string[];
};

type AwaitableSearchParams = Promise<SearchParamsInput> | SearchParamsInput | undefined;

const DEFAULT_LANGUAGE: Language = "de";

export function normalizeLanguage(value?: string | string[]): Language {
  const normalized = Array.isArray(value) ? value[0] : value;

  if (!normalized) {
    return DEFAULT_LANGUAGE;
  }

  return (SUPPORTED_LANGUAGES as readonly string[]).includes(normalized)
    ? (normalized as Language)
    : DEFAULT_LANGUAGE;
}

export async function getLanguageFromSearchParams(
  searchParams: AwaitableSearchParams,
): Promise<Language> {
  if (!searchParams) {
    return DEFAULT_LANGUAGE;
  }

  const resolved = await searchParams;
  return normalizeLanguage(resolved.lang);
}

export function withLanguage(path: string, language: Language): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${language}`;
}
