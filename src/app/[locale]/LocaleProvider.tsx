"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
