import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gigs`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitegrade`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cdm`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...['wrought', 'apex_drop', 'ghost_mountain', 'drive', 'blue_horizon', 'proj_mom', 'cafe_du_monde'].map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date('2026-09-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}