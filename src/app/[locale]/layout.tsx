import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import LocaleProvider from "./LocaleProvider";
import Footer from "../../lib/Footer";

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <LocaleProvider locale={locale} messages={messages}>
      {children}
      <Footer />
    </LocaleProvider>
  );
}
