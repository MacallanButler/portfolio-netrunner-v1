import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { BRAND } from "@/lib/brand";
import { Shell } from "@/components/layout/Shell";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import { ModalOrchestrator } from "@/components/core/ModalOrchestrator";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.displayName} | Full-Stack Development & UI Architecture Studio`,
    template: `%s | ${BRAND.displayName}`
  },
  description: `${BRAND.legalName} is a web development and UI architecture studio founded by ${BRAND.founder}, specializing in high-fidelity React, Next.js, and bespoke digital solutions.`,
  keywords: [
    BRAND.displayName,
    BRAND.legalName,
    "Web Development LLC",
    "Software Development Company",
    BRAND.founder,
    "Full-Stack Developer",
    "UI Architect",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Freelance Developer"
  ],
  authors: [{ name: BRAND.displayName }],
  creator: BRAND.displayName,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRAND.siteUrl,
    title: `${BRAND.displayName} | Full-Stack Development & UI Architecture Studio`,
    description: `${BRAND.legalName} is a web development and UI architecture studio founded by ${BRAND.founder}, specializing in high-fidelity React, Next.js, and bespoke digital solutions.`,
    siteName: BRAND.displayName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.displayName} | Full-Stack Development & UI Architecture Studio`,
    description: `${BRAND.legalName} is a web development and UI architecture studio founded by ${BRAND.founder}, specializing in high-fidelity React, Next.js, and bespoke digital solutions.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-surface-dark text-text-primary selection:bg-neon-cyan/30 selection:text-neon-cyan`}
      >
          <ProjectModalProvider>
            <Shell>
              {children}
            </Shell>
            <ModalOrchestrator />
          </ProjectModalProvider>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FXCR09481R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXCR09481R');
          `}
        </Script>
      </body>
    </html>
  );
}
