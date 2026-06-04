import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["de", "en", "fr", "ja", "zh"],
  defaultLocale: "de",
});

export function middleware(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|en|fr|ja|zh)/:path*",
    "/((?!_next|_vercel|.*\\..*|api).*)",
  ],
};
