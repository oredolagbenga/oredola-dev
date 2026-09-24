import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic'

async function tryFetch(url: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 
        "User-Agent": "RankEngine/1.0 (oredola.dev)",
        "Accept": "text/html,application/xhtml+xml",
      },
      cache: "no-store",
      redirect: "follow",
    })
    const html = await res.text()
    if (html.length < 200) throw new Error("Empty page")
    return { res, html, finalUrl: url }
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeDomain(input: string): string[] {
  let raw = input.trim().toLowerCase()
  raw = raw.replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/\s+/g, "")
  if (!raw) return []
  
  const hasWWW = raw.startsWith("www.")
  const withoutWWW = hasWWW ? raw.slice(4) : raw
  const withWWW = hasWWW ? raw : `www.${raw}`

  // Try 4 variants in order: what user typed (https), opposite www, http fallback
  // Example: oredola.dev -> https://oredola.dev, https://www.oredola.dev, http://oredola.dev
  // Example: www.example.com -> https://www.example.com, https://example.com, http://www.example.com
  return [
    `https://${raw}`,
    `https://${hasWWW ? withoutWWW : withWWW}`,
    `http://${raw}`,
    `https://${withoutWWW}`, // final fallback without www
  ].filter((v,i,a) => a.indexOf(v) === i) // unique
}

async function audit(inputUrl: string) {
  const candidates = normalizeDomain(inputUrl)
  if (candidates.length === 0) throw new Error("Invalid domain")

  let lastError = ""
  let html = ""
  let res: Response | null = null
  let successUrl = ""

  for (const url of candidates) {
    try {
      const result = await tryFetch(url)
      html = result.html
      res = result.res as any
      successUrl = url
      break
    } catch (e:any) {
      lastError = e.message
      continue
    }
  }

  if (!html || !res) {
    throw new Error(`Could not fetch ${inputUrl}. Last error: ${lastError}. Try with https://`)
  }

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ""
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g,"").trim())
  const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1] || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)?.[1] || ""
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] || ""
  const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html)
  const hasSchema = /application\/ld\+json/i.test(html)
  const hasFAQ = /FAQPage/i.test(html)
  const imgWithoutAlt = (html.match(/<img[^>]*>/gi) || []).filter(img =>!/alt=/i.test(img)).length
  const domainHost = (() => { try { return new URL(successUrl).hostname } catch { return inputUrl } })()
  const internalLinks = (html.match(new RegExp(`href=["'][^"']*${domainHost.replace('www.','')}`, "gi")) || []).length

  const logs: string[] = []
  logs.push(`> fetched ${successUrl} — ${html.length} bytes • status ${res.status}`)
  if (successUrl !== `https://${inputUrl.replace(/^https?:\/\//, "")}`) {
    logs.push(`> normalized input "${inputUrl}" → ${successUrl} (auto www / https fix)`)
  }
  logs.push(`> title: ${title.length} chars — "${title.slice(0,70)}" ${title.length>60? "→ TOO LONG (50-60)" : title.length<30? "→ TOO SHORT" : "→ OK"}`)
  logs.push(`> h1: ${h1Matches.length} found — ${h1Matches[0]? `"${h1Matches[0].slice(0,60)}"` : "MISSING H1"} ${h1Matches.length!==1? `→ need exactly 1 H1` : "→ OK"}`)
  logs.push(`> meta: ${metaDesc.length} chars — ${metaDesc? `"${metaDesc.slice(0,70)}..."` : "MISSING → add 140-160 chars"}`)
  logs.push(`> canonical: ${canonical || "MISSING"}`)
  logs.push(`> mobile: ${hasViewport? "viewport OK" : "MISSING viewport"}`)
  logs.push(`> schema: ${hasSchema? "found" : "NO schema"} | FAQ: ${hasFAQ? "found" : "missing"}`)
  logs.push(`> images without alt: ${imgWithoutAlt}`)
  logs.push(`> internal links: ${internalLinks}`)

  let score = 100
  if (title.length > 60 || title.length < 30) score -= 15
  if (h1Matches.length!== 1) score -= 20
  if (!metaDesc) score -= 20
  if (!hasSchema) score -= 10
  if (imgWithoutAlt > 0) score -= 5
  if (!hasViewport) score -= 15
  score = Math.max(0, score)
  logs.push(`> score: ${score}/100 — ${score<75? "critical fixes needed" : score<90? "1-2 tweaks" : "good to rank"}`)

  return { logs, score, title, metaDesc, h1Count: h1Matches.length, canonical, hasViewport, hasSchema, hasFAQ, imgWithoutAlt, internalLinks, url: successUrl, input: inputUrl }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const url = body.url?.trim()
    if (!url) return NextResponse.json({ logs: ["> error: enter domain e.g. oredola.dev or www.example.com"] }, { status: 400 })
    const data = await audit(url)
    return NextResponse.json(data)
  } catch (e:any) {
    return NextResponse.json({ logs: [`> fetch failed for ${e.message}`, `> tip: try oredola.dev, www.example.com, studentpay.com.ng`, `> we auto try https://, https://www., http://`] })
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')?.trim()
  if (!url) return NextResponse.json({ logs: ["> error: provide ?url=oredola.dev"] }, { status: 400 })
  try {
    const data = await audit(url)
    return NextResponse.json(data)
  } catch (e:any) {
    return NextResponse.json({ logs: [`> fetch failed for ${url}`, `> ${e.message}`] })
  }
}
