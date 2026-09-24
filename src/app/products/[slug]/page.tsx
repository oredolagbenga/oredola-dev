import { notFound } from 'next/navigation'
import Link from 'next/link'

const products: Record<string, { name: string; tagline: string; users: string; status: 'live' | 'beta' | 'building'; desc: string; features: string[] }> = {
  academiabase: {
    name: 'AcademiaBase',
    tagline: 'AI research hub for students',
    users: '2.3k',
    status: 'live',
    desc: 'AcademiaBase helps African students research 10x faster. Paste a paper, get summary, citations, and related works. Built for Nigerian universities where research access is limited.',
    features: ['AI summarizer', 'Auto citations', 'Related papers', 'Used by 2.3k students']
  },
  learnvault: {
    name: 'LearnVault',
    tagline: 'Study vault for African students',
    users: '1.8k',
    status: 'live',
    desc: 'Secure vault for lecture notes, past questions, and study materials. Offline-first, built for low-data.',
    features: ['Offline vault', 'Past questions', '1.8k active']
  },
  rankengine: {
    name: 'RankEngine',
    tagline: 'SEO ranking system that actually ranks',
    users: '890',
    status: 'live',
    desc: 'RankEngine is the SEO system powering oredola.dev. It tracks keyword decay, internal linking gaps, and auto-generates schema. This is the engine behind your 2 → 12 sitemap growth.',
    features: ['Rank tracking', 'Sitemap health', 'Schema generator', 'Powers oredola.dev']
  },
  examai: {
    name: 'ExamAI',
    tagline: 'AI exam prep',
    users: '3.1k',
    status: 'beta',
    desc: 'Generates practice questions and explains answers for 100+ courses. Beta with 3.1k testers.',
    features: ['Practice Q&A', 'Explain mode', '3.1k beta']
  },
  'naijaseo-kit': {
    name: 'NaijaSEO Kit',
    tagline: 'Local SEO kit for Naija businesses',
    users: '560',
    status: 'live',
    desc: 'Templates, schema and content to rank on Google Nigeria. Built for Lagos businesses.',
    features: ['Local schema', 'GMB kit', '560 users']
  },
  studentpay: {
    name: 'StudentPay',
    tagline: 'Payments for students',
    users: '1.2k',
    status: 'building',
    desc: 'Simplifies school fees and group contributions. Building in public.',
    features: ['Group payments', '1.2k waitlist']
  },
}

// Tell Next.js to pre-build all 6 pages = no N/A
export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = products[params.slug]
  if (!p) return {}
  return {
    title: `${p.name} - ${p.tagline} | Oredola Gbenga`,
    description: p.desc,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = products[params.slug]
  if (!p) notFound()

  return (
    <main className="mx-auto max-w- px-6 py-24">
      <Link href="/products" className="text- text-white/50 hover:text-white">← All products</Link>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> {p.status} • {p.users} users • oredola.dev
      </div>

      <h1 className="mt-6 text- md:text- font-black leading-[0.9] tracking-tight">{p.name}</h1>
      <p className="mt-3 text- text-white/60">{p.tagline}</p>

      <p className="mt-8 text- leading-[1.8] text-white/70">{p.desc}</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {p.features.map(f => (
          <div key={f} className="rounded- bg-white/[0.04] border border-white/[0.06] p-3 text- text-white/70">{f}</div>
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        <Link href="/" className="rounded-full bg-white text-black px-6 py-2.5 text- font-medium">Back home</Link>
        <Link href="/products" className="rounded-full border border-white/15 px-6 py-2.5 text-">Explore 8 products</Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.desc,
        author: { "@type": "Person", name: "Oredola Gbenga" },
        url: `https://oredola.dev/products/${params.slug}`,
      })}} />
    </main>
  )
}