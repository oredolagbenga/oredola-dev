import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oredola.dev'
  const now = new Date()

  return [
  { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
  { url: `${base}/products/rankengine`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  { url: `https://lexicon.oredola.dev`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  { url: `https://lexicon.oredola.dev/browse`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
]
}