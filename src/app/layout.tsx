import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  metadataBase: new URL("https://oredola.dev"),
  title: "Oredola Gbenga - Senior Web Dev x AI Engineer",
  description: "Senior Web Dev x AI Engineer - 8 products shipped, 1000+ users, $420/mo MRR. Builder of AcademiaBase, RankEngine, LearnVault.",
  alternates: {
    canonical: "https://oredola.dev",
  },
  openGraph: {
    type: "website",
    url: "https://oredola.dev",
    title: "Oredola Gbenga - Senior Web Dev x AI Engineer",
    description: "Senior Web Dev x AI Engineer - 8 products shipped, 1000+ users, $420/mo MRR. Builder of AcademiaBase, RankEngine, LearnVault.",
    siteName: "oredola.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oredola Gbenga - Senior Web Dev x AI Engineer",
    description: "Senior Web Dev x AI Engineer - 8 products shipped, 1000+ users, $420/mo MRR.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ConditionalNavbar />
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}