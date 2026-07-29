import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Web Services & Maintenance Plans | Macallan Butler Portfolio",
  description: "Professional web development, search engine optimization, performance tuning, and month-to-month care plans by Macallan Butler. Transparent pricing, no contract required.",
  alternates: {
    canonical: "https://macallanbutler.com/services",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Web Development & Maintenance Services",
    "description": "Professional web development, search engine optimization, performance tuning, and month-to-month care plans by Macallan Butler.",
    "url": "https://macallanbutler.com/services",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Starter Web Presence Build",
          "description": "Clean, fast, and professional website presence. Includes up to 4 standard pages, contact form, mobile-friendly design, basic SEO setup, and domain connection.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "1200",
            "highPrice": "1800"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Standard Web Marketing Build",
          "description": "Polished marketing website built to convert visitors. Includes up to 6 standard pages, gallery or portfolio, testimonials, embedded booking, and Google Analytics setup.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "2000",
            "highPrice": "3200"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Custom E-commerce & Web Applications",
          "description": "Fully custom web applications tailored to specific business needs. Features online booking, custom CMS content editing, Stripe payments integration, and email automations.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "3500",
            "priceCurrencyDescription": "starting at"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Basic Monthly Care Plan",
          "description": "Essential website maintenance plan keeping the site secure, live, and up-to-date. Features uptime monitoring, SSL checks, dependency updates, and up to 1 hour of monthly changes.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "75",
            "priceCurrencyDescription": "per month"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "Growth Monthly Care Plan",
          "description": "Performance audits, search visibility tracking, and support. Features Lighthouse performance audits, Search Console reviews, and up to 3 hours of monthly work/changes.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "150",
            "priceCurrencyDescription": "per month"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Partner Monthly Care Plan",
          "description": "Comprehensive development and strategy relationship. Features monthly analytics review, 30-minute strategy call, quarterly content refreshes, and up to 6 hours of monthly work.",
          "provider": {
            "@type": "Person",
            "name": "Macallan Butler",
            "worksFor": {
              "@type": "Organization",
              "name": "MCB Industries LLC"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "350",
            "priceCurrencyDescription": "per month"
          }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient />
    </>
  );
}
