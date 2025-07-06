import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./themeProviders";


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
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
