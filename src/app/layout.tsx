import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/Header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import Footer from "~/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Natan`s game app",
  description: "a game app i made for showing my fullstack skills",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-[100vh] select-none flex-col items-center justify-between gap-2 bg-[#121213] p-2 sm:gap-8",
          fontSans.variable,
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
