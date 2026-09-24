import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oredola.dev'
  const now = new Date()

  const products = [
    'academiabase',
    'learnvault',
    'rankengine',
    'examai',
    'naijaseo-kit',
    'studentpay',
    'shipfast-ng',
    'tutoros',
  ]

  const productUrls = products.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: slug === 'rankengine' ? 0.9 : 0.8,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...productUrls,
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}