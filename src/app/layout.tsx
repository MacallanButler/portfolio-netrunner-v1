import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Shell } from "@/components/layout/Shell";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import { AudioProvider } from "@/context/AudioContext";
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
    default: "Macallan Butler | Full-Stack Developer & UI Architect",
    template: "%s | Macallan Butler"
  },
  description: "Macallan Butler is a freelance Full-Stack Developer & UI Architect specializing in high-fidelity React, Next.js, and motion-driven user interfaces.",
  keywords: ["Macallan Butler", "Full-Stack Developer", "UI Architect", "React Developer", "Next.js", "TypeScript", "Web Developer Portfolio", "Freelance Developer"],
  authors: [{ name: "Macallan Butler" }],
  creator: "Macallan Butler",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macallanbutler.com",
    title: "Macallan Butler | Full-Stack Developer & UI Architect",
    description: "Freelance Full-Stack Developer & UI Architect specializing in high-fidelity React, Next.js, and motion-driven user interfaces. Explore my projects and process.",
    siteName: "Macallan Butler Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macallan Butler | Full-Stack Developer & UI Architect",
    description: "Freelance Full-Stack Developer & UI Architect specializing in high-fidelity React, Next.js, and motion-driven user interfaces.",
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
        <AudioProvider>
          <ProjectModalProvider>
            <Shell>
              {children}
            </Shell>
            <ModalOrchestrator />
          </ProjectModalProvider>
        </AudioProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Macallan Butler Web Development",
              "image": "https://macallanbutler.com/icon.svg",
              "@id": "https://macallanbutler.com/#service",
              "url": "https://macallanbutler.com",
              "telephone": "",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlotte",
                "addressRegion": "NC",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 35.227087,
                "longitude": -80.843127
              },
              "sameAs": [
                "https://github.com/MacallanButler"
              ],
              "description": "Macallan Butler is a freelance Full-Stack Developer & UI Architect specializing in high-fidelity React, Next.js, and motion-driven user interfaces.",
              "provider": {
                "@type": "Person",
                "name": "Macallan Butler",
                "jobTitle": "Full-Stack Developer & UI Architect"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Starter Web Build Package",
                  "price": "300.00",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Standard Web Build Package",
                  "price": "500.00",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Basic Monthly Care Plan",
                  "price": "75.00",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Growth Monthly Care Plan",
                  "price": "150.00",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Partner Monthly Care Plan",
                  "price": "350.00",
                  "priceCurrency": "USD"
                }
              ]
            })
          }}
        />

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
