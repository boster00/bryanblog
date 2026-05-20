// Utility-page hydration batch via CJGEO API.
// Generates: /about (full), /contact (intro), home /why-this-blog-exists (intro block).
// Usage: node --env-file=C:/Users/xsj70/GuildOS/.env.local scripts/hydrate-utility-batch.mjs

import { promises as fs } from 'fs';
import path from 'path';

const BASE = 'https://cjgeoai.com';
const KEY = process.env.CJGEO_API_KEY;
if (!KEY) { console.error('CJGEO_API_KEY missing'); process.exit(1); }
const ROOT = path.resolve(process.cwd());

const ABOUT_CTX = `Audience: 55-75 year olds searching for retirement-planning guidance who want to understand what Bryan Blog is before reading articles. Voice: calm, plain-spoken, mature, like a kitchen-table conversation with a trusted advisor. 8th-grade reading level. NEVER salesy, NEVER hype. Compliance: no specific product recommendations, no insurer names, no return projections, no uncaveated guarantees. Target 700-900 words. Use h2 subheadings phrased the way someone would search: "What is Bryan Blog?", "Who is this blog for?", "What makes it different from other retirement sites?", "How is the content organized (pillar guides + deep dives)?", "What is Bryan Blog NOT?", "How do I get started?". Plain HTML output: h2, h3, p, ul, li, strong, em. No inline styles, no scripts, no images, no h1 (renders separately). End with a soft note inviting readers to start with the pillar guide /retirement-income/ - link inline using <a href="/retirement-income/">the pillar guide</a>. Mention that detailed deep-dive articles branch from there. Convey: this blog is a small library of plain-English guides on retirement income planning, for people who want honest tradeoffs rather than product pushes.`;

const CONTACT_CTX = `Audience: a near-retiree who is considering reaching out to a retirement advisor for a review. Voice: calm, plain-spoken, mature, like a kitchen-table conversation. 8th-grade reading level. NEVER salesy, NEVER hype. Compliance: no specific product recommendations, no insurer names, no return projections. Target 250-350 words. Use 2-3 h2 subheadings phrased as: "When does it make sense to reach out?", "What happens in a retirement income review?", "What to bring to the conversation". Plain HTML output: h2, p, ul, li, strong, em. No h1. Convey: reaching out is a low-pressure conversation, not a sales call; the goal is to understand the reader's situation, identify the income gap, and help them think through tradeoffs; bring expenses, Social Security estimate, account balances; the review is a thinking exercise, not a buying decision. Mention briefly that detailed checklists live at /retirement-income/income-review-checklist/ - link inline.`;

const HOME_CTX = `Audience: a visitor on the homepage of Bryan Blog (a retirement income planning guide library) - they're scanning the page deciding whether to dig in. Voice: calm, plain-spoken, mature, conversational. 8th-grade reading level. NEVER salesy. Compliance: no specific product names, no projections, no uncaveated guarantees. Target 180-280 words. Use ONE h2 subheading: "Why this blog exists". Then 2-3 paragraphs of body prose. NO h1, NO additional h2s. Plain HTML output: h2, p, strong, em. NO ul/ol, NO h3 - keep this tight and prose-only. Convey: most retirement content online is either sales-driven (pushing annuities or specific products) or so technical it loses normal readers; this blog sits in the middle - plain-English, honest about tradeoffs, no product pushes, organized as pillar guides with deep-dive satellites; the goal is to help readers think through their own situation, not to sell anything.`;

const ARTICLES = [
  {
    key: 'about',
    title: 'About Bryan Blog',
    seedKeyword: 'about retirement income blog plain english',
    contextPrompt: ABOUT_CTX,
    outPath: 'content/about/index.html',
  },
  {
    key: 'contact',
    title: 'Contact Bryan',
    seedKeyword: 'request retirement income review',
    contextPrompt: CONTACT_CTX,
    outPath: 'content/contact/intro.html',
  },
  {
    key: 'home',
    title: 'Why This Blog Exists',
    seedKeyword: 'plain english retirement planning advice',
    contextPrompt: HOME_CTX,
    outPath: 'content/home/why-this-blog-exists.html',
  },
];

async function api(method, url, body) {
  const r = await fetch(BASE + url, {
    method,
    headers: { 'x-api-key': KEY, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = text; }
  if (!r.ok) {
    const err = new Error(`HTTP ${r.status} ${method} ${url} :: ${text.slice(0,300)}`);
    err.status = r.status; err.body = json; throw err;
  }
  return json;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ===== Sanitizer (lifted from hydrate-pillar.mjs, adapted) =====

function stripWrappers(html) {
  let h = html;
  h = h.replace(/<!DOCTYPE[^>]*>/gi, '');
  h = h.replace(/<\?xml[^>]*\?>/gi, '');
  h = h.replace(/<\/?html[^>]*>/gi, '');
  h = h.replace(/<head[\s\S]*?<\/head>/gi, '');
  h = h.replace(/<\/?body[^>]*>/gi, '');
  h = h.replace(/<\/?main[^>]*>/gi, '');
  h = h.replace(/<\/?article[^>]*>/gi, '');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '');
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '');
  h = h.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  h = h.replace(/<!--[\s\S]*?-->/g, '');
  h = h.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  h = h.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  h = h.replace(/<header[\s\S]*?<\/header>/gi, '');
  h = h.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  h = h.replace(/<h1[\s\S]*?<\/h1>/gi, '');
  h = h.replace(/<link[^>]*>/gi, '');
  h = h.replace(/<meta[^>]*>/gi, '');
  h = h.replace(/<title[\s\S]*?<\/title>/gi, '');
  h = h.replace(/<img[^>]*>/gi, '');
  h = h.replace(/<picture[\s\S]*?<\/picture>/gi, '');
  h = h.replace(/<figure[\s\S]*?<\/figure>/gi, '');
  return h;
}
function stripDivsSections(html) {
  let prev; let h = html;
  do { prev = h; h = h.replace(/<(div|section)[^>]*>([\s\S]*?)<\/\1>/gi, '$2'); } while (h !== prev);
  h = h.replace(/<\/?(div|section)[^>]*>/gi, '');
  return h;
}
function stripAttrs(html) {
  return html.replace(/<([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag, attrs) => {
    const t = tag.toLowerCase();
    if (t === 'a') {
      const hrefMatch = attrs.match(/\shref\s*=\s*("([^"]*)"|'([^']*)')/i);
      const href = hrefMatch ? (hrefMatch[2] || hrefMatch[3]) : '';
      return href ? `<a href="${href}">` : '<a>';
    }
    return `<${t}>`;
  });
}
function whitelistTags(html) {
  const allowed = new Set(['h2','h3','p','ul','ol','li','strong','em','a','table','thead','tbody','tr','th','td','hr','blockquote','b','i','br']);
  return html.replace(/<\/?([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag) => {
    return allowed.has(tag.toLowerCase()) ? match : '';
  });
}
function slugifyText(t) {
  return t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);
}
function injectH2Ids(html) {
  const seen = new Set();
  return html.replace(/<h2(?:[^>]*)>([\s\S]*?)<\/h2>/gi, (m, inner) => {
    const text = inner.replace(/<[^>]*>/g, '').trim();
    let id = slugifyText(text) || 'section';
    let i = 2; const base = id;
    while (seen.has(id)) { id = `${base}-${i++}`; }
    seen.add(id);
    return `<h2 id="${id}">${text}</h2>`;
  });
}
function keepTopLevelBlocks(html) {
  // Re-tokenize: only keep whitelisted top-level blocks (h2/h3/p/ul/ol/table/blockquote/hr).
  // This catches orphan bare text between sections.
  const allowed = ['h2','h3','p','ul','ol','table','blockquote','hr'];
  const re = new RegExp(`<(${allowed.join('|')})(?:[^>]*)>[\\s\\S]*?<\\/\\1>|<hr\\s*/?>`, 'gi');
  const matches = html.match(re);
  return (matches || []).join('\n');
}
function wordCount(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}

function sanitize(raw) {
  let h = stripWrappers(raw);
  h = stripDivsSections(h);
  h = stripAttrs(h);
  h = whitelistTags(h);
  h = keepTopLevelBlocks(h);
  h = injectH2Ids(h);
  h = h.replace(/\n{3,}/g, '\n\n').trim();
  return h;
}

// ===== Per-article worker =====

async function prepareArticle(art) {
  console.log(`[${art.key}] create...`);
  const created = await api('POST', '/api/v1/articles', {
    title: art.title,
    keyword: art.seedKeyword,
    create: true,
  });
  const articleId = created.article_id || created.id || created.articleId;
  art.articleId = articleId;
  art.chosenKeyword = art.seedKeyword;
  art.fullAutoOK = true;
  console.log(`[${art.key}] article_id=${articleId}`);

  console.log(`[${art.key}] set_main_keyword (seed)`);
  await api('POST', `/api/articles/${articleId}/keyword`, {
    action: 'set_main_keyword',
    main_keyword: art.seedKeyword,
  });

  console.log(`[${art.key}] keyword full_auto...`);
  try {
    const fa = await api('POST', `/api/articles/${articleId}/keyword`, {});
    console.log(`[${art.key}] full_auto OK`);
  } catch (e) {
    console.warn(`[${art.key}] full_auto failed (${e.status}); falling back to seed.`);
    art.fullAutoOK = false;
  }

  if (art.fullAutoOK) {
    try {
      const assets = await api('POST', `/api/articles/${articleId}`, { action: 'get_assets' });
      const kws = Array.isArray(assets.keywords) ? assets.keywords : [];
      if (kws.length) {
        const ranked = kws.slice().sort((a,b) => (b.volume || 0) - (a.volume || 0));
        const layPhrased = ranked.find(k => /retirement|money|income|annuity|review|planning|advice/i.test(k.keyword || ''));
        const candidate = layPhrased || ranked[0];
        if (candidate && candidate.keyword && candidate.keyword !== art.seedKeyword) {
          // Use suggestion if it's lay-phrased and not wildly different. Otherwise keep seed.
          art.chosenKeyword = candidate.keyword;
          console.log(`[${art.key}] switching keyword: "${art.seedKeyword}" -> "${candidate.keyword}" (vol=${candidate.volume ?? '?'})`);
          await api('POST', `/api/articles/${articleId}/keyword`, {
            action: 'set_main_keyword',
            main_keyword: art.chosenKeyword,
          });
        } else {
          console.log(`[${art.key}] keeping seed keyword`);
        }
      }
    } catch (e) {
      console.warn(`[${art.key}] get_assets/refine failed; keeping seed.`, e.message);
    }
  }

  console.log(`[${art.key}] generate_draft...`);
  const genStart = Date.now();
  await api('POST', `/api/articles/${articleId}/edit-draft`, {
    action: 'generate_draft',
    mode: 'new_draft',
    allow_image_generation: false,
    context_prompt: art.contextPrompt,
    use_default_context_prompt: false,
    generation_prompt_mode: 'default',
  });
  art.genStart = genStart;
  art.ready = false;
}

async function pollOnce(art) {
  if (art.ready) return;
  try {
    const s = await api('POST', `/api/articles/${art.articleId}/edit-draft`, { action: 'pull_status' });
    const phase = s.status || s.state || s.phase || 'unknown';
    art.lastPhase = phase;
    if (phase === 'ready' || phase === 'done' || phase === 'complete' || s.draft_ready === true || s.ready === true) {
      art.ready = true;
      art.genWall = Math.round((Date.now() - art.genStart) / 1000);
    }
    if (phase === 'failed' || phase === 'error') {
      art.failed = true;
      art.failureBody = s;
    }
  } catch (e) {
    art.lastPhase = `pull_err: ${e.status || e.message}`;
  }
}

async function finishArticle(art) {
  console.log(`[${art.key}] adopt_draft...`);
  await api('POST', `/api/articles/${art.articleId}/edit-draft`, { action: 'adopt_draft' });

  console.log(`[${art.key}] get_html...`);
  const htmlRes = await api('POST', `/api/articles/${art.articleId}`, { action: 'get_html' });
  let raw = htmlRes.html || htmlRes.content || htmlRes.body || htmlRes.content_html || '';
  if (typeof raw !== 'string') raw = JSON.stringify(raw);
  art.rawSize = raw.length;

  const sanitized = sanitize(raw);
  art.sanitizedSize = sanitized.length;
  art.wordCount = wordCount(sanitized);

  const header = `<!--\n  CJGEO-generated article body.\n  article_id: ${art.articleId}\n  main_keyword: ${art.chosenKeyword}\n  adopted_at: ${new Date().toISOString().slice(0,10)}\n-->\n`;
  const outAbs = path.join(ROOT, art.outPath);
  await fs.mkdir(path.dirname(outAbs), { recursive: true });
  await fs.writeFile(outAbs, header + sanitized);
  console.log(`[${art.key}] wrote ${art.outPath} (raw=${art.rawSize} sanitized=${art.sanitizedSize} wc=${art.wordCount})`);
}

(async function main() {
  const startTotal = Date.now();

  // Phase 1: kick off all 3 in parallel
  await Promise.all(ARTICLES.map(prepareArticle));

  console.log('\n--- All 3 generations kicked off. Polling concurrently ---\n');

  // Phase 2: poll concurrently, 60s cadence, 20min cap per article.
  const overallDeadline = Date.now() + 25 * 60 * 1000;
  while (ARTICLES.some(a => !a.ready && !a.failed) && Date.now() < overallDeadline) {
    await sleep(60_000);
    await Promise.all(ARTICLES.filter(a => !a.ready && !a.failed).map(pollOnce));
    const summary = ARTICLES.map(a => `${a.key}=${a.lastPhase || '?'}`).join(' | ');
    console.log(`${new Date().toISOString().slice(11,19)} ${summary}`);
  }

  // Phase 3: adopt + sanitize + write for any ready ones
  for (const art of ARTICLES) {
    if (art.failed) {
      console.error(`[${art.key}] FAILED: ${JSON.stringify(art.failureBody).slice(0,300)}`);
      continue;
    }
    if (!art.ready) {
      console.error(`[${art.key}] STUCK at deadline; last phase ${art.lastPhase}`);
      continue;
    }
    try { await finishArticle(art); }
    catch (e) { console.error(`[${art.key}] finish failed:`, e.message); art.finishError = e.message; }
  }

  // Meta report
  const report = ARTICLES.map(a => ({
    key: a.key, articleId: a.articleId, chosenKeyword: a.chosenKeyword,
    fullAutoOK: a.fullAutoOK, ready: !!a.ready, failed: !!a.failed,
    genWall: a.genWall, wc: a.wordCount, outPath: a.outPath, finishError: a.finishError || null,
  }));
  await fs.writeFile(path.join(ROOT, 'scripts/.utility-batch-meta.json'), JSON.stringify(report, null, 2));
  console.log('\n=== BATCH REPORT ===');
  console.log(JSON.stringify(report, null, 2));
  console.log(`\nTotal: ${Math.round((Date.now() - startTotal) / 1000)}s`);
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
