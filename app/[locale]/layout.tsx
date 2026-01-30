import { ReactNode } from "react";
import { Kanit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { Nav } from "@/component/header/nav";
import StoreProvider from "@/store/StoreProvider";

const kanit = Kanit({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
});

export const metadata = {
  title: "swd-frontend-test",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${kanit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} timeZone="Asia/Bangkok">
          <ConfigProvider theme={theme}>
            <StoreProvider>
              <Nav />
              <div className="flex flex-col h-[calc(100vh-94px)] max-w-7xl mx-auto">
                {children}
              </div>
            </StoreProvider>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
