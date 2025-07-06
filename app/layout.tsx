import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./themeProviders";
import SessionWrapper from "@/components/sessionWrapper";


export const metadata: Metadata = {
  title: "noCoffee",
  description: "Prevents cold starts, doesn't let your free tier apps sleep",
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
            {children}
          </ThemeProviders>
        </SessionWrapper>
      </body>
    </html >
  );
}
