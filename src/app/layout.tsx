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
  title: "Macallan Butler's Portfolio",
  description: "A cyberpunk portfolio interface for netrunners.",
  icons: {
    icon: "/icon.svg",
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
