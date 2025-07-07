// import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./themeProviders";
import SessionWrapper from "@/components/sessionWrapper";
import InitPage from "@/components/initPage";


export const metadata = {
  title: "LazyPing — Smart Pings for Free-Tier Projects",
  description:
    "LazyPing helps students and indie devs keep their free-tier APIs warm without triggering bot detection. Add endpoints, get random pings every 10 minutes, and stay alive — the clever way.",
  keywords: [
    "LazyPing",
    "api",
    "free hosting",
    "API ping tool",
    "cold start",
    "render cold start",
    "render free tier",
    "free-tier",
    "cold start prevention",
    "free tier uptime",
    "ping scheduler",
    "developer tools",
    "student projects",
    "serverless uptime",
  ],
  authors: [{ name: "Abhraneel Dhar", url: "https://abhraneeldhar.vercel.app" }],
  creator: "Abhraneel Dhar",
  metadataBase: new URL("https://abhraneeldhar.vercel.app"),

  openGraph: {
    title: "LazyPing — Keep Your APIs Warm Without Triggering Bots",
    description:
      "Prevents cold starts, doesn't let your free tier apps sleep",
    url: "https://lazyping.vercel.app",
    siteName: "LazyPing",
    images: [
      {
        url: `https://lazyping.vercel.app/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "LazyPing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LazyPing",
    description: "Prevents cold starts, doesn't let your free tier apps sleep",
    images: [`https://lazyping.vercel.app/opengraph-image.png`],
    creator: "@abhraneeldhar",

  },
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionWrapper>
          <ThemeProviders>
            <InitPage />
            {children}
          </ThemeProviders>
        </SessionWrapper>
      </body>
    </html >
  );
}
