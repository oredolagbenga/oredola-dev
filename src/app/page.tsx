export const dynamic = 'force-dynamic'
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page(){
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Oredola Gbenga",
    "url": "https://oredola.dev",
    "jobTitle": "Senior Web Dev x AI Engineer",
    "description": "Senior Web Dev x AI Engineer - 8 products shipped, 1000+ users, $420/mo MRR. Builder of AcademiaBase, RankEngine, LearnVault.",
    "sameAs": [
      "https://linkedin.com/in/oredola",
      "https://github.com/oredola"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does RankEngine audit?",
        "acceptedAnswer": { "@type": "Answer", "text": "RankEngine audits title, H1, meta description, canonical, viewport, schema, FAQ schema, images without alt, internal links, and visibility. Works with or without www." }
      },
      {
        "@type": "Question",
        "name": "Does RankEngine work with or without www?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Enter oredola.dev, www.example.com, or example.com — it auto-fixes https and www and fetches the live site." }
      },
      {
        "@type": "Question",
        "name": "How can I contact Oredola for SEO help?",
        "acceptedAnswer": { "@type": "Answer", "text": "Chat on WhatsApp +2349034555644 or email hello@oredola.dev. Lagos, WAT. Response within 2 hours." }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--fg)] selection:text-[var(--bg)] antialiased">
      <div className="relative z-10">
        <Hero/>
        <Products/>
        <Services/>
        <Stack />
        <Contact />
        <Footer />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}