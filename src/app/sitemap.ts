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
      url: `${baseUrl}/comms`,
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
      url: `${baseUrl}/design-system`,
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
  ];
}