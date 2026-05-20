// Pillar hydration via CJGEO API.
// Usage: node --env-file=C:/Users/xsj70/GuildOS/.env.local scripts/hydrate-pillar.mjs
// Writes: content/retirement-income/pillar.html + scripts/.pillar-meta.json

import { promises as fs } from 'fs';
import path from 'path';

const BASE = 'https://cjgeoai.com';
const KEY = process.env.CJGEO_API_KEY;
if (!KEY) { console.error('CJGEO_API_KEY missing'); process.exit(1); }

const ROOT = path.resolve(process.cwd());

const ANCHORS = [
  { id: 'last-as-long-as-i-do',  keywords: ['last as long', 'last as i'] },
  { id: 'steady-income-plan',    keywords: ['steady income', 'simple plan'] },
  { id: 'safe-versus-invested',  keywords: ['safe versus', 'safe vs', 'safe and invested', 'keep safe'] },
  { id: 'what-i-give-up',        keywords: ['give up', 'certainty'] },
  { id: 'annuity-fit',           keywords: ['annuity actually fit', 'annuity fit', 'fits my situation'] },
  { id: 'compare-options',       keywords: ['compare options', 'compare annuity', 'fine print'] },
  { id: 'what-to-do-next',       keywords: ['do before making', 'do next', 'making a decision', 'should i do'] },
];

const SATELLITE_LINKS = {
  'last-as-long-as-i-do': [
    { href: '/retirement-income/monthly-income-needs/', title: 'how much monthly income do I actually need in retirement' },
  ],
  'steady-income-plan': [
    { href: '/retirement-income/retirement-paycheck/', title: 'how to build a retirement paycheck from Social Security, savings, and investments' },
  ],
  'safe-versus-invested': [
    { href: '/retirement-income/move-money-before-retirement/', title: 'should I move money out of the market before retirement' },
    { href: '/retirement-income/cds-bonds-annuities/', title: 'CDs vs bonds vs annuities' },
  ],
  'what-i-give-up': [
    { href: '/retirement-income/annuity-downsides/', title: 'what are the downsides of annuities' },
    { href: '/retirement-income/annuity-fees-explained/', title: 'annuity fees, surrender charges, and guarantees explained' },
  ],
  'annuity-fit': [
    { href: '/retirement-income/who-should-consider-annuity/', title: 'who should consider an annuity, and who should avoid one' },
    { href: '/retirement-income/guaranteed-income-allocation/', title: 'how much of my savings should be in guaranteed income' },
  ],
  'compare-options': [
    { href: '/retirement-income/compare-annuity-options/', title: 'how to compare annuity options before you buy' },
    { href: '/retirement-income/annuity-types-compared/', title: 'fixed vs fixed indexed vs income annuity' },
  ],
  'what-to-do-next': [
    { href: '/retirement-income/income-review-checklist/', title: 'what to bring to a retirement income review' },
  ],
};

const PILLAR_CONTEXT = `Audience: 55-75 year olds anxious about running out of money in retirement. They have saved $250K-$2M, are pre-retired or recently retired, and are NOT financial professionals. Voice: calm, plain-spoken, mature, like a kitchen-table conversation with a trusted advisor. 8th-grade reading level. NEVER salesy, NEVER hype. Compliance: no product names, no insurer names, no specific return projections, no uncaveated guarantees (use "may", "often", "depending on your situation"); annuity guarantees must be caveated "subject to the insurance company's claims-paying ability".

This is a PILLAR article — depth is welcome. Target 2000-3000 words.

The article MUST use EXACTLY these 7 section h2 headings, in this exact order, phrased as questions a layperson would search:
1. Will my money last as long as I do?
2. What's a simple plan for steady income in retirement?
3. How much should I keep safe versus invested?
4. What do I give up to get more certainty?
5. How do I know whether an annuity actually fits my situation?
6. How do I compare options without getting lost in the fine print?
7. What should I do before making a decision?

Open with a 2-paragraph introduction BEFORE section 1 that validates the reader's anxiety and previews the journey. End section 7 with a soft CTA paragraph mentioning a retirement income review (no buttons; just text).

Section topic guidance (use these as prompts for what each section covers; the h2 must remain as listed above):
§1: The core fear of running out. Accumulation vs decumulation. People live 20-30+ years in retirement. Social Security covers part, not all. Start by estimating the gap between monthly expenses and guaranteed income.
§2: Replacing a paycheck mentally. Income layers: Social Security, pension, withdrawals from 401(k)/IRA/brokerage, cash, interest/dividends/CDs/bonds, rental income, annuity income. Each layer plays a different role.
§3: Balancing growth and stability in retirement. The risk of a market drop right after you retire (without using the jargon "sequence of returns"). Comparing safer options: cash, CDs, bonds, bond ladders, fixed annuities, fixed indexed annuities, immediate/income annuities. The tradeoff: less flexibility for more certainty.
§4: Confront skepticism about annuities head-on. The legitimate concerns: complexity, surrender charges, fees, liquidity restrictions, opacity. The honest framing: more certainty comes with less flexibility. Cover what readers actually want to know: access to money, fees, guaranteed vs projected income, inflation, death benefits, long-term care, insurance company strength.
§5: Reframe from "should you buy an annuity?" to "what job does this money need to do?" When an annuity may fit (predictable income, less market exposure, covering essentials, lifetime income, spouse protection). When it may not (full liquidity, short-term cash, max growth, simple low-cost investing).
§6: Move from education to evaluation. Annuities aren't one product — organize by consumer need not product label. Evaluation questions: what's guaranteed, what's not, fees, surrender period, access, early death, market up/down, insurance company strength, whether it actually closes the income gap.
§7: Action section. Recommend a retirement income review, not a product purchase. List what to bring: expense estimate, Social Security letter, pension info, account balances, current income, debts, spouse needs, liquidity needs, long-term care concerns, legacy goals.

Plain HTML output: h2 (the 7 listed above), h3 (subsections within if helpful), p, ul, li, strong, em, table (for §3 or §6 comparison if helpful). No inline styles, no scripts, no images, no h1 (the title renders separately), no internal links yet (a downstream step will inject them).`;

async function api(method, url, body) {
  const r = await fetch(BASE + url, {
    method,
    headers: { 'x-api-key': KEY, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = text; }
  if (!r.ok) {
    console.error(`HTTP ${r.status} ${method} ${url}\n${text}`);
    const err = new Error(`HTTP ${r.status}`); err.status = r.status; err.body = json; throw err;
  }
  return json;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function fuzzyMatchAnchor(headingText) {
  const t = headingText.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  for (const a of ANCHORS) {
    for (const kw of a.keywords) {
      if (t.includes(kw)) return a.id;
    }
  }
  return null;
}

function stripWrappers(html) {
  let h = html;
  // Strip doctype, html/head/body wrappers
  h = h.replace(/<!DOCTYPE[^>]*>/gi, '');
  h = h.replace(/<\?xml[^>]*\?>/gi, '');
  h = h.replace(/<\/?html[^>]*>/gi, '');
  h = h.replace(/<head[\s\S]*?<\/head>/gi, '');
  h = h.replace(/<\/?body[^>]*>/gi, '');
  h = h.replace(/<\/?main[^>]*>/gi, '');
  h = h.replace(/<\/?article[^>]*>/gi, '');
  // Strip scripts, styles, svgs, comments
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '');
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '');
  h = h.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  h = h.replace(/<!--[\s\S]*?-->/g, '');
  // Strip <aside>, <nav>, <header>, <footer> blocks
  h = h.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  h = h.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  h = h.replace(/<header[\s\S]*?<\/header>/gi, '');
  h = h.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  // Strip h1 in body
  h = h.replace(/<h1[\s\S]*?<\/h1>/gi, '');
  // Strip link, meta, title
  h = h.replace(/<link[^>]*>/gi, '');
  h = h.replace(/<meta[^>]*>/gi, '');
  h = h.replace(/<title[\s\S]*?<\/title>/gi, '');
  // Strip <img>, <picture>, <figure>
  h = h.replace(/<img[^>]*>/gi, '');
  h = h.replace(/<picture[\s\S]*?<\/picture>/gi, '');
  h = h.replace(/<figure[\s\S]*?<\/figure>/gi, '');
  return h;
}

function stripDivsSections(html) {
  // Remove <div> and <section> wrappers entirely (keep inner)
  let prev;
  let h = html;
  do {
    prev = h;
    h = h.replace(/<(div|section)[^>]*>([\s\S]*?)<\/\1>/gi, '$2');
  } while (h !== prev);
  // Also any stray opening or closing tags
  h = h.replace(/<\/?(div|section)[^>]*>/gi, '');
  return h;
}

function stripAttrs(html) {
  // Remove class, style, aria-*, data-*, id from non-h2 tags
  // We'll allow id only on h2 (we add it ourselves)
  return html.replace(/<([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag, attrs) => {
    const t = tag.toLowerCase();
    if (t === 'a') {
      // keep href only
      const hrefMatch = attrs.match(/\shref\s*=\s*("([^"]*)"|'([^']*)')/i);
      const href = hrefMatch ? (hrefMatch[2] || hrefMatch[3]) : '';
      return href ? `<a href="${href}">` : '<a>';
    }
    // strip everything for now (h2 ids re-added in next pass)
    return `<${t}>`;
  });
}

function whitelistTags(html) {
  const allowed = new Set(['h2','h3','p','ul','ol','li','strong','em','a','table','thead','tbody','tr','th','td','hr','blockquote','b','i','br']);
  return html.replace(/<\/?([a-z][a-z0-9]*)([^>]*)>/gi, (match, tag) => {
    return allowed.has(tag.toLowerCase()) ? match : '';
  });
}

function assignAnchorIds(html) {
  const headings = [];
  let out = '';
  let lastIdx = 0;
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]*>/g, '').trim();
    const anchorId = fuzzyMatchAnchor(text);
    headings.push({ text, anchorId, raw: m[0], start: m.index, end: m.index + m[0].length });
  }
  if (headings.length !== 7) {
    return { html, headings, ok: false, reason: `Expected 7 h2, got ${headings.length}` };
  }
  const usedIds = new Set();
  for (const h of headings) {
    if (!h.anchorId) return { html, headings, ok: false, reason: `No anchor map for "${h.text}"` };
    if (usedIds.has(h.anchorId)) return { html, headings, ok: false, reason: `Duplicate anchor ${h.anchorId} (text: "${h.text}")` };
    usedIds.add(h.anchorId);
  }
  // Reassemble with ids
  let cursor = 0;
  let parts = [];
  for (const h of headings) {
    parts.push(html.slice(cursor, h.start));
    parts.push(`<h2 id="${h.anchorId}">${h.text}</h2>`);
    cursor = h.end;
  }
  parts.push(html.slice(cursor));
  return { html: parts.join(''), headings, ok: true };
}

function injectSatelliteLinks(html) {
  // For each section (h2 to next h2 or end), find the last </p> and insert deep-dive after it.
  const sectionRe = /<h2 id="([^"]+)">[\s\S]*?<\/h2>/g;
  const matches = [];
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    matches.push({ id: m[1], headingEnd: m.index + m[0].length, headingStart: m.index });
  }
  // Build new html section by section
  let result = '';
  for (let i = 0; i < matches.length; i++) {
    const sec = matches[i];
    const next = matches[i + 1];
    const sectionStart = (i === 0) ? 0 : matches[i].headingStart;
    const sectionEnd = next ? next.headingStart : html.length;
    if (i === 0) {
      // Intro region: 0 -> first heading start
      result += html.slice(0, matches[0].headingStart);
    }
    // Section content from heading start to next heading start
    let block = html.slice(sec.headingStart, sectionEnd);
    const links = SATELLITE_LINKS[sec.id] || [];
    if (links.length) {
      const linkHtml = links.map(l => `<p><em>&rarr; Deep dive: <a href="${l.href}">${l.title}</a></em></p>`).join('\n');
      // Insert before next heading or at end of section
      // Strategy: append to end of block (block already ends at next-heading start, so it sits right between sections)
      // But better: insert AFTER the last </p> within block.
      const lastClose = block.lastIndexOf('</p>');
      if (lastClose >= 0) {
        const insertAt = lastClose + '</p>'.length;
        block = block.slice(0, insertAt) + '\n' + linkHtml + '\n' + block.slice(insertAt);
      } else {
        block = block + '\n' + linkHtml + '\n';
      }
    }
    result += block;
  }
  return result;
}

function wordCount(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
}

(async function main() {
  const startTotal = Date.now();
  const RESUME_ID = process.env.PILLAR_ARTICLE_ID;
  let articleId;
  let fullAutoOK = true;
  let chosenKeyword = 'will my money last in retirement';
  let chosenVolume = null;
  let runnerUps = [];

  if (RESUME_ID) {
    console.log('[1] Resuming with existing article_id:', RESUME_ID);
    articleId = RESUME_ID;
  } else {
    console.log('[1] Creating CJGEO article...');
    const created = await api('POST', '/api/v1/articles', {
      title: 'Will My Money Last in Retirement?',
      keyword: 'will my money last in retirement',
      create: true,
    });
    articleId = created.article_id || created.id || created.articleId;
    console.log('    article_id:', articleId);

    console.log('[2] set_main_keyword...');
    await api('POST', `/api/articles/${articleId}/keyword`, {
      action: 'set_main_keyword',
      main_keyword: 'will my money last in retirement',
    });

    console.log('[3] keyword full_auto...');
    try {
      const fa = await api('POST', `/api/articles/${articleId}/keyword`, {});
      console.log('    full_auto:', JSON.stringify(fa).slice(0, 400));
    } catch (e) {
      console.warn('    full_auto failed; will use seed keyword.', e.body || e.message);
      fullAutoOK = false;
    }
  }

  if (fullAutoOK) {
    console.log('[4] get_assets...');
    const assets = await api('POST', `/api/articles/${articleId}`, { action: 'get_assets' });
    const kws = Array.isArray(assets.keywords) ? assets.keywords : [];
    console.log(`    keywords returned: ${kws.length}`);
    if (kws.length) {
      // Sort by volume desc, prefer lay-phrased (contains "retirement" or "money")
      const ranked = kws.slice().sort((a, b) => (b.volume || 0) - (a.volume || 0));
      // pick top-volume that is lay-phrased
      const preferred = ranked.find(k => /retirement|money|income|savings/i.test(k.keyword || '')) || ranked[0];
      if (preferred && preferred.keyword) {
        chosenKeyword = preferred.keyword;
        chosenVolume = preferred.volume ?? null;
      }
      runnerUps = ranked.slice(0, 6).filter(k => k.keyword !== chosenKeyword).slice(0, 5).map(k => ({ kw: k.keyword, vol: k.volume }));
      console.log('    chosen:', chosenKeyword, 'vol:', chosenVolume);
      console.log('    runners:', JSON.stringify(runnerUps));
      if (chosenKeyword !== 'will my money last in retirement') {
        await api('POST', `/api/articles/${articleId}/keyword`, {
          action: 'set_main_keyword',
          main_keyword: chosenKeyword,
        });
      }
    }
  }

  console.log('[5] generate_draft...');
  const genStart = Date.now();
  await api('POST', `/api/articles/${articleId}/edit-draft`, {
    action: 'generate_draft',
    mode: 'new_draft',
    allow_image_generation: false,
    context_prompt: PILLAR_CONTEXT,
    use_default_context_prompt: false,
    generation_prompt_mode: 'default',
  });

  console.log('[6] polling pull_status (60s cadence, 20min cap)...');
  let status = null;
  const deadline = Date.now() + 20 * 60 * 1000;
  while (Date.now() < deadline) {
    await sleep(60_000);
    let s;
    try { s = await api('POST', `/api/articles/${articleId}/edit-draft`, { action: 'pull_status' }); }
    catch (e) { console.warn('    pull_status err:', e.body || e.message); continue; }
    status = s;
    const phase = s.status || s.state || s.phase || 'unknown';
    console.log(`    ${new Date().toISOString().slice(11,19)} phase=${phase}`);
    if (phase === 'ready' || phase === 'done' || phase === 'complete' || s.draft_ready === true || s.ready === true) break;
    if (phase === 'failed' || phase === 'error') throw new Error(`generation failed: ${JSON.stringify(s).slice(0,300)}`);
  }
  const genWall = Math.round((Date.now() - genStart) / 1000);
  console.log(`    generation wall: ${genWall}s`);

  console.log('[7] adopt_draft...');
  await api('POST', `/api/articles/${articleId}/edit-draft`, { action: 'adopt_draft' });

  console.log('[8] get_html...');
  const htmlRes = await api('POST', `/api/articles/${articleId}`, { action: 'get_html' });
  let raw = htmlRes.html || htmlRes.content || htmlRes.body || '';
  if (typeof raw !== 'string') raw = JSON.stringify(raw);
  console.log(`    raw size: ${raw.length}`);

  console.log('[9] sanitize...');
  let h = stripWrappers(raw);
  h = stripDivsSections(h);
  h = stripAttrs(h);
  h = whitelistTags(h);
  // Collapse whitespace runs
  h = h.replace(/\n{3,}/g, '\n\n').trim();
  console.log(`    sanitized size: ${h.length}`);

  console.log('[10] assign anchor ids...');
  const mapped = assignAnchorIds(h);
  if (!mapped.ok) {
    console.error('    ANCHOR MAP FAILED:', mapped.reason);
    console.error('    headings found:', JSON.stringify(mapped.headings.map(x => ({ text: x.text, mappedTo: x.anchorId })), null, 2));
    // Save raw for inspection
    await fs.writeFile(path.join(ROOT, 'scripts/.pillar-raw.html'), raw);
    await fs.writeFile(path.join(ROOT, 'scripts/.pillar-sanitized.html'), h);
    process.exit(2);
  }
  h = mapped.html;
  const headingReport = mapped.headings.map(x => ({ id: x.anchorId, text: x.text }));
  console.log('    headings:', JSON.stringify(headingReport, null, 2));

  console.log('[11] inject satellite deep-dive links...');
  h = injectSatelliteLinks(h);
  let linkCount = 0;
  for (const id of Object.keys(SATELLITE_LINKS)) linkCount += SATELLITE_LINKS[id].length;
  console.log(`    links injected: ${linkCount}`);

  const wc = wordCount(h);
  console.log(`    final word count: ${wc}`);

  console.log('[12] write content/retirement-income/pillar.html...');
  const outPath = path.join(ROOT, 'content/retirement-income/pillar.html');
  await fs.writeFile(outPath, h);
  await fs.writeFile(path.join(ROOT, 'scripts/.pillar-meta.json'), JSON.stringify({
    articleId, chosenKeyword, chosenVolume, runnerUps, genWall, rawSize: raw.length, sanitizedSize: h.length, wc, headings: headingReport, linksInjected: linkCount,
  }, null, 2));

  const totalSec = Math.round((Date.now() - startTotal) / 1000);
  console.log(`\nDONE in ${totalSec}s`);
  console.log('article_id:', articleId);
  console.log('chosen keyword:', chosenKeyword, 'vol:', chosenVolume);
  console.log('runners:', JSON.stringify(runnerUps));
  console.log('html size sanitized:', h.length, 'words:', wc);
})().catch(e => { console.error(e); process.exit(1); });
