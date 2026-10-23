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
    "name": "Oredola Gbenga Augustine",
    "url": "https://oredola.dev",
    "jobTitle": "Founder @ oredola.dev | Builder of Oro Lexicon",
    "description": "Senior Web Dev x AI Engineer - Founder of oredola.dev. Builder of Oro Lexicon (Yoruba language archive), AcademiaBase, RankEngine, LearnVault. 9 products shipped.",
    "sameAs": [
      "https://linkedin.com/in/oredola",
      "https://github.com/oredola",
      "https://lexicon.oredola.dev"
    ]
  };

    const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://oredola.dev/#organization",
    "name": "oredola.dev",
    "url": "https://oredola.dev",
    "founder": {
      "@type": "Person",
      "name": "Oredola Gbenga Augustine",
      "url": "https://oredola.dev"
    },
    "sameAs": [
      "https://lexicon.oredola.dev"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Oro Lexicon",
    "url": "https://lexicon.oredola.dev",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Oredola Gbenga Augustine",
      "url": "https://oredola.dev"
    },
    "publisher": {
      "@type": "Organization",
      "name": "oredola.dev",
      "url": "https://oredola.dev"
    },
    "description": "Oro Lexicon by Oredola Gbenga Augustine — Community-driven Yorùbá archive preserving Egba, Ijebu & Standard Yoruba with accurate tones, IPA & native audio pronunciation. Live at lexicon.oredola.dev under oredola.dev.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NGN"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Oro Lexicon?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oro Lexicon is a Yoruba language archive built by Oredola Gbenga Augustine at lexicon.oredola.dev. It documents Egba, Ijebu and Standard Yoruba with tones, IPA and native audio. Flagship product of oredola.dev." }
      },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}