import { NextResponse } from 'next/server';

interface Issue {
  severity: 'high' | 'medium' | 'low';
  message: string;
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function extractMetaContent(html: string, attrName: 'name' | 'property', attrValue: string): string | null {
  const metaTagRegex = /<meta\s+[^>]*>/gi;
  const tags = html.match(metaTagRegex) ?? [];
  for (const tag of tags) {
    const nameMatch = new RegExp(`${attrName}=["']${attrValue}["']`, 'i').test(tag);
    if (!nameMatch) continue;
    const contentMatch = tag.match(/content=["']([^"']*)["']/i);
    if (contentMatch) return contentMatch[1];
  }
  return null;
}

function analyzeHtml(html: string, responseTimeMs: number, isHttps: boolean) {
  const issues: Issue[] = [];

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  const metaDescription = extractMetaContent(html, 'name', 'description');
  const viewport = extractMetaContent(html, 'name', 'viewport');
  const ogTitle = extractMetaContent(html, 'property', 'og:title');
  const ogImage = extractMetaContent(html, 'property', 'og:image');
  const hasFavicon = /<link[^>]+rel=["'](?:shortcut )?icon["']/i.test(html);

  const h1Matches = html.match(/<h1[^>]*>/gi) ?? [];
  const imgTags = html.match(/<img\s[^>]*>/gi) ?? [];
  const imgsMissingAlt = imgTags.filter((tag) => !/\salt=["'][^"']*["']/i.test(tag)).length;

  const htmlSizeKB = Math.round(Buffer.byteLength(html, 'utf8') / 1024);

  // ─── SEO ───
  let seoScore = 100;
  if (!title) {
    issues.push({ severity: 'high', message: 'Missing a <title> tag — this is one of the strongest on-page SEO signals.' });
    seoScore -= 30;
  } else if (title.length < 15 || title.length > 65) {
    issues.push({ severity: 'medium', message: `Title tag is ${title.length} characters — aim for 50-60 for best display in search results.` });
    seoScore -= 10;
  }
  if (!metaDescription) {
    issues.push({ severity: 'high', message: 'Missing a meta description — search engines will auto-generate a snippet instead of your own pitch.' });
    seoScore -= 25;
  } else if (metaDescription.length < 70 || metaDescription.length > 165) {
    issues.push({ severity: 'medium', message: `Meta description is ${metaDescription.length} characters — aim for 150-160 for the best search snippet.` });
    seoScore -= 10;
  }
  if (h1Matches.length === 0) {
    issues.push({ severity: 'high', message: 'No <h1> heading found — every page should have exactly one clear main heading.' });
    seoScore -= 20;
  } else if (h1Matches.length > 1) {
    issues.push({ severity: 'low', message: `Found ${h1Matches.length} <h1> tags — having more than one can dilute your page's topical focus.` });
    seoScore -= 5;
  }
  seoScore = Math.max(0, seoScore);

  // ─── Mobile ───
  let mobileScore = 100;
  if (!viewport) {
    issues.push({ severity: 'high', message: 'No mobile viewport tag found — the page likely won\'t scale correctly on phones.' });
    mobileScore -= 60;
  }
  mobileScore = Math.max(0, mobileScore);

  // ─── Performance ───
  let performanceScore = 100;
  if (responseTimeMs > 2000) {
    issues.push({ severity: 'high', message: `Server response took ${(responseTimeMs / 1000).toFixed(1)}s — slow first response hurts both rankings and conversions.` });
    performanceScore -= 35;
  } else if (responseTimeMs > 800) {
    issues.push({ severity: 'medium', message: `Server response took ${responseTimeMs}ms — under 800ms is a good target for a fast first byte.` });
    performanceScore -= 15;
  }
  if (htmlSizeKB > 300) {
    issues.push({ severity: 'medium', message: `The HTML document itself is ${htmlSizeKB}KB — that's large before any images or scripts even load.` });
    performanceScore -= 15;
  }
  performanceScore = Math.max(0, performanceScore);

  // ─── Best Practices ───
  let bestPracticesScore = 100;
  if (!isHttps) {
    issues.push({ severity: 'high', message: 'Site is not served over HTTPS — this hurts trust, SEO, and browsers will flag it as "Not Secure".' });
    bestPracticesScore -= 40;
  }
  if (!hasFavicon) {
    issues.push({ severity: 'low', message: 'No favicon detected — a small but easy trust signal to add.' });
    bestPracticesScore -= 10;
  }
  if (imgTags.length > 0 && imgsMissingAlt > 0) {
    const pct = Math.round((imgsMissingAlt / imgTags.length) * 100);
    issues.push({ severity: 'medium', message: `${imgsMissingAlt} of ${imgTags.length} images (${pct}%) are missing alt text — this hurts accessibility and image SEO.` });
    bestPracticesScore -= Math.min(30, pct / 3);
  }
  if (!ogTitle || !ogImage) {
    issues.push({ severity: 'low', message: 'Missing Open Graph tags — links shared on social media or WhatsApp won\'t show a proper preview card.' });
    bestPracticesScore -= 10;
  }
  bestPracticesScore = Math.max(0, Math.round(bestPracticesScore));

  const categories = [
    { name: 'Performance', score: performanceScore },
    { name: 'SEO', score: seoScore },
    { name: 'Mobile', score: mobileScore },
    { name: 'Best Practices', score: bestPracticesScore },
  ];

  const overallScore = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);

  const severityWeight = { high: 3, medium: 2, low: 1 };
  const sortedIssues = [...issues].sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity]);
  const improvements = sortedIssues.slice(0, 3).map((i) => i.message);

  return {
    overallScore,
    categories,
    issues: sortedIssues,
    improvements,
    meta: { responseTimeMs, htmlSizeKB, title, imageCount: imgTags.length },
  };
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide a website URL.' }, { status: 400 });
    }

    const targetUrl = normalizeUrl(url);
    let parsed: URL;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'That doesn\'t look like a valid URL.' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const start = Date.now();
    let response: Response;
    try {
      response = await fetch(parsed.toString(), {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VibeVentureWebsiteChecker/1.0)' },
        redirect: 'follow',
      });
    } catch {
      return NextResponse.json({ error: 'Could not reach that website — check the URL and try again.' }, { status: 502 });
    } finally {
      clearTimeout(timeout);
    }
    const responseTimeMs = Date.now() - start;

    if (!response.ok) {
      return NextResponse.json({ error: `The site responded with an error (HTTP ${response.status}).` }, { status: 502 });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return NextResponse.json({ error: 'That URL didn\'t return an HTML page.' }, { status: 400 });
    }

    const html = await response.text();
    const isHttps = new URL(response.url || parsed.toString()).protocol === 'https:';
    const result = analyzeHtml(html, responseTimeMs, isHttps);

    return NextResponse.json({ url: parsed.toString(), ...result });
  } catch (error) {
    console.error('Website analysis failed:', error);
    return NextResponse.json({ error: 'Something went wrong while analyzing the site. Please try again.' }, { status: 500 });
  }
}
