import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/layout/Shell";
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
        <Shell>
          {children}
        </Shell>

        <script
          src="https://www.googletagmanager.com/gtag/js?id=G-FXCR09481R"
          strategy="afterInteractive"
        />
        <script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G-FXCR09481R');
          `}
        </script>
      </body>
    </html>
  );
}
