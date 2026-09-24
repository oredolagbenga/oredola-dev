import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oredola.dev'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/products/rankengine`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/products/academiabase`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/products/learnvault`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/products/studentpay`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]
}