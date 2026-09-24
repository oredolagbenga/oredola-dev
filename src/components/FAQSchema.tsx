export default function FAQSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is RankEngine only for Nigeria?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. Built in Lagos, works globally. Checks global SEO standards — title, H1, speed, schema — that work anywhere from SEO tool Nigeria to AI SEO tool USA." }
        },
        {
          "@type": "Question",
          "name": "What is RankEngine?",
          "acceptedAnswer": { "@type": "Answer", "text": "AI SEO engine built by Oredola Gbenga that audits your site like Google does and tells you exactly what to fix to rank higher." }
        },
        {
          "@type": "Question",
          "name": "What is AcademiaBase?",
          "acceptedAnswer": { "@type": "Answer", "text": "AI research hub built by Oredola Gbenga with 2.3k users, helping researchers organize and discover papers." }
        }
      ]
    }
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  }