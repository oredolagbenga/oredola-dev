import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oredola-dev.vercel.app'
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/products/rankengine`, lastModified: new Date() },
    { url: `${base}/products/academiabase`, lastModified: new Date() },
  ]
}
