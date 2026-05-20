// CJGEO → bryanblog HTML sanitizer.
//
// PERMISSIVE / FIDELITY mode. The strategy is "drop-list, not allow-list":
// CJGEO emits hundreds of BEM-style class names (stat-card__label,
// bucket--safe, compare-card__heading, timeline__item, …). Trying to
// enumerate every preserved class is a losing game. So this sanitizer
// PRESERVES ALL class names by default and only DROPS classes (and their
// blocks) that are known page-chrome (hero, site-header, article-meta,
// toc, cta-box, sidebar, author-bio, byline, etc.).
//
// Strip rules:
//   - Document scaffolding (<!DOCTYPE>, html/head/body/main/article, <style>,
//     <script>, comments, <link>, <meta>, <title>, <header>, <footer>, <nav>)
//   - <h1> in body (title renders in ArticleShell)
//   - <img>, <picture> (CJGEO uses placeholder divs — visual; no real assets)
//   - Any <div>/<section>/<aside> whose class is in DROP_BLOCK_CLASSES
//     (block + contents)
//   - Bare <aside> (sidebar/TOC chrome)
//   - <input>, <label> (CJGEO's CSS-only FAQ accordion; we keep <details>
//     instead, which works without CSS)
//
// Preservation rules (PERMISSIVE):
//   - All structural elements: tables, lists (ul/ol/li/dl/dt/dd), blockquotes,
//     figures (figure/figcaption), details/summary, pre/code, mark/abbr, hr
//   - Inline SVGs (svg/circle/path/rect/line/polyline/polygon/ellipse) for
//     icons, diagrams, bucket visuals, timeline dots, etc.
//   - ALL class names on div/span/ul/ol/li/table/section that aren't on the
//     drop-list — so callout--warn, stat-card__label, bucket--safe,
//     compare-card__heading, timeline__item all flow through and get styled
//     by .prose-article CSS.

// Page-chrome classes — block (and its contents) are dropped entirely.
const DROP_BLOCK_CLASSES = new Set([
  // Hero / article header / titles (page chrome — ArticleShell renders this)
  "hero",
  "hero-inner",
  "hero-visual",
  "hero-visual__icon",
  "hero-visual__text",
  "hero-visual-label",
  "hero-image",
  "hero-image-placeholder",
  "hero-image-placeholder__inner",
  "hero-image-placeholder__label",
  "hero-image__label",
  "hero-media",
  "hero-meta",
  "hero-sub",
  "hero-svg",
  "hero-tag",
  "hero-label",
  "hero-intro",
  "hero-deck",
  "hero__byline",
  "hero__category",
  "hero__date",
  "hero__image-label",
  "hero__image-placeholder",
  "hero__meta",
  "hero__meta-divider",
  "hero__subtitle",
  "hero__svg-scene",
  "hero__title",
  "article-hero",
  "article-hero__category",
  "article-hero__title",
  "article-hero__deck",
  "article-hero__lede",
  "article-hero__meta",
  "article-hero__meta-author",
  "article-hero__meta-avatar",
  "article-hero__meta-text",
  "article-hero__subtitle",
  "article-header",
  "article-deck",
  // Site shell
  "site-header",
  "site-header-inner",
  "site-footer",
  "site-footer-inner",
  "site-name",
  "site-tagline",
  "site-wrap",
  "footer-disclaimer",
  "footer-name",
  "footer-cta",
  // TOC (ArticleShell renders its own TOC)
  "toc",
  "toc-box",
  "toc-card",
  "toc-list",
  "toc-heading",
  "toc-title",
  "toc-num",
  "toc__list",
  "toc__title",
  "toc__num",
  "sidebar",
  "article-sidebar",
  // Article meta / byline / author (page chrome)
  "article-meta",
  "article-meta__author",
  "article-meta__divider",
  "article-meta__sep",
  "article-label",
  "article-title",
  "article-subtitle",
  "article-category",
  "meta-bar",
  "meta-item",
  "meta-author",
  "meta-divider",
  "byline",
  "byline-bar",
  "byline-avatar",
  "byline-text",
  "byline-dot",
  "author-avatar",
  "author-bio",
  "author-bio__avatar",
  "author-bio__desc",
  "author-bio__name",
  "author-bio__text",
  "author-box",
  "author-info",
  "author-name",
  "reading-time",
  // CJGEO CTA blocks (bryanblog renders its own <Cta>)
  "cta-section",
  "cta-block",
  "cta-block__btn",
  "cta-block__eyebrow",
  "cta-block__note",
  "cta-block__text",
  "cta-box",
  "cta-box__body",
  "cta-box__button",
  "cta-box__disclaimer",
  "cta-box__eyebrow",
  "cta-box__heading",
  "cta-btn",
  "cta-button",
  "cta-heading",
  "cta-fine",
]);

function getClassList(attrs) {
  const m = attrs.match(/\bclass\s*=\s*"([^"]+)"/i);
  if (!m) return [];
  return m[1].split(/\s+/).filter(Boolean);
}

function buildClassAttr(classes) {
  // Strip drop-list classes. Keep everything else.
  const kept = classes.filter((c) => !DROP_BLOCK_CLASSES.has(c));
  return kept.length ? ` class="${kept.join(" ")}"` : "";
}

// Allowed tags (after curated-div pass).
const ALLOWED_TAGS = new Set([
  // Headings (h1 stripped separately)
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // Text blocks
  "p",
  "blockquote",
  "pre",
  "hr",
  "br",
  // Lists
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  // Tables
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  // Inline structure
  "strong",
  "em",
  "b",
  "i",
  "a",
  "code",
  "mark",
  "abbr",
  "small",
  "sub",
  "sup",
  "u",
  "span",
  "time",
  // Disclosure (FAQ accordions)
  "details",
  "summary",
  // Figures
  "figure",
  "figcaption",
  // Wrappers (kept if class isn't on drop-list)
  "div",
  "section",
  // SVG (icons, diagrams)
  "svg",
  "g",
  "circle",
  "path",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "text",
  "tspan",
  "defs",
  "linearGradient",
  "radialGradient",
  "stop",
  "use",
  "title",
]);

function stripScaffoldingAndChrome(html) {
  let h = html;
  h = h.replace(/<!DOCTYPE[^>]*>/gi, "");
  h = h.replace(/<\?xml[^>]*\?>/gi, "");
  h = h.replace(/<\/?html[^>]*>/gi, "");
  h = h.replace(/<head[\s\S]*?<\/head>/gi, "");
  h = h.replace(/<\/?body[^>]*>/gi, "");
  h = h.replace(/<\/?main[^>]*>/gi, "");
  h = h.replace(/<\/?article[^>]*>/gi, "");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<style[\s\S]*?<\/style>/gi, "");
  h = h.replace(/<!--[\s\S]*?-->/g, "");
  h = h.replace(/<link[^>]*>/gi, "");
  h = h.replace(/<meta[^>]*>/gi, "");
  h = h.replace(/<title[\s\S]*?<\/title>/gi, "");
  h = h.replace(/<header[\s\S]*?<\/header>/gi, "");
  h = h.replace(/<footer[\s\S]*?<\/footer>/gi, "");
  h = h.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  h = h.replace(/<img[^>]*>/gi, "");
  h = h.replace(/<picture[\s\S]*?<\/picture>/gi, "");
  h = h.replace(/<h1[\s\S]*?<\/h1>/gi, "");
  // Strip CSS-only FAQ accordion controls (we keep <details> instead, which
  // works without CSS — CSS-only accordions are dead once we strip <style>).
  h = h.replace(/<input\b[^>]*\/?>/gi, "");
  h = h.replace(/<label\b[^>]*>([\s\S]*?)<\/label>/gi, "$1");

  // Drop any <div>/<section>/<aside> whose class is in DROP_BLOCK_CLASSES — block AND contents.
  let prev;
  do {
    prev = h;
    h = h.replace(
      /<(div|section|aside)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
      (match, tag, attrs) => {
        const classes = getClassList(attrs);
        if (classes.some((c) => DROP_BLOCK_CLASSES.has(c))) return "";
        return match;
      }
    );
  } while (h !== prev);

  // Drop bare <aside> (CJGEO uses it for sidebar/TOC chrome).
  h = h.replace(/<aside[\s\S]*?<\/aside>/gi, "");

  return h;
}

function unwrapSections(html) {
  // Unwrap <section> tags (keep contents). Class info already filtered to
  // drop-list above; surviving sections are content sections. We don't need
  // the <section> wrapper itself.
  let h = html;
  h = h.replace(/<section\b[^>]*>/gi, "");
  h = h.replace(/<\/section>/gi, "");
  return h;
}

function cleanAttributesAndUnwrap(html) {
  let h = html;

  // Process span tags innermost-first. Iterate until stable.
  // We KEEP all non-drop-list classes (permissive).
  let prev;
  do {
    prev = h;
    h = h.replace(
      /<span\b([^>]*)>((?:(?!<span\b)[\s\S])*?)<\/span>/gi,
      (_m, attrs, inner) => {
        const classes = getClassList(attrs);
        if (classes.some((c) => DROP_BLOCK_CLASSES.has(c))) return "";
        const classAttr = buildClassAttr(classes);
        return `<span${classAttr}>${inner}</span>`;
      }
    );
  } while (h !== prev);

  // Process div tags innermost-first. Drop divs whose class hits drop-list;
  // otherwise keep div with non-drop-list classes.
  do {
    prev = h;
    h = h.replace(
      /<div\b([^>]*)>((?:(?!<div\b)[\s\S])*?)<\/div>/gi,
      (_m, attrs, inner) => {
        const classes = getClassList(attrs);
        if (classes.some((c) => DROP_BLOCK_CLASSES.has(c))) return "";
        const classAttr = buildClassAttr(classes);
        return `<div${classAttr}>${inner}</div>`;
      }
    );
  } while (h !== prev);

  // After the inner-first pass, any remaining <div> opening tag still has
  // its raw attrs. Rewrite to keep only class (filtered).
  h = h.replace(/<div\b([^>]*)>/gi, (_m, attrs) => {
    const classes = getClassList(attrs);
    if (classes.some((c) => DROP_BLOCK_CLASSES.has(c))) return ""; // shouldn't happen
    const classAttr = buildClassAttr(classes);
    return `<div${classAttr}>`;
  });

  // Handle <a>: keep href only.
  h = h.replace(/<a\b([^>]*)>/gi, (_m, attrs) => {
    const m = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
    const href = m ? (m[2] !== undefined ? m[2] : m[3]) : "";
    return href ? `<a href="${href}">` : "<a>";
  });

  // SVG: keep class + structural geometry attributes.
  const SVG_ALLOWED_ATTRS = new Set([
    "viewBox",
    "fill",
    "fill-rule",
    "fill-opacity",
    "xmlns",
    "aria-hidden",
    "cx",
    "cy",
    "r",
    "rx",
    "ry",
    "d",
    "x",
    "y",
    "x1",
    "y1",
    "x2",
    "y2",
    "points",
    "stroke",
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-dasharray",
    "stroke-opacity",
    "width",
    "height",
    "transform",
    "opacity",
    "offset",
    "stop-color",
    "stop-opacity",
    "preserveAspectRatio",
    "text-anchor",
    "font-size",
    "dx",
    "dy",
    "gradientUnits",
    "gradientTransform",
  ]);
  function filterSvgAttrs(attrs) {
    const out = [];
    const re = /\s+([a-zA-Z][a-zA-Z0-9-]*)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let m;
    while ((m = re.exec(attrs)) !== null) {
      const name = m[1];
      const val = m[3] !== undefined ? m[3] : m[4];
      if (SVG_ALLOWED_ATTRS.has(name)) {
        out.push(`${name}="${val}"`);
      } else if (name === "class") {
        // permissive: keep all classes
        const kept = val.split(/\s+/).filter(Boolean);
        if (kept.length) out.push(`class="${kept.join(" ")}"`);
      }
    }
    return out.length ? " " + out.join(" ") : "";
  }
  const SVG_TAGS_RE = /<(svg|g|circle|path|rect|line|polyline|polygon|ellipse|defs|linearGradient|radialGradient|stop|use|text|tspan)\b([^>]*?)(\/?)>/gi;
  h = h.replace(SVG_TAGS_RE, (_m, tag, attrs, slash) => {
    return `<${tag}${filterSvgAttrs(attrs)}${slash}>`;
  });

  // Strip attrs on h2/h3/h4/h5/h6 (anchor ids re-injected in a later pass).
  h = h.replace(/<(h2|h3|h4|h5|h6)\b[^>]*>/gi, (_m, tag) => `<${tag}>`);

  // <ul>, <ol>, <li>: keep class (permissive).
  h = h.replace(/<(ul|ol|li)\b([^>]*)>/gi, (_m, tag, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildClassAttr(classes);
    return `<${tag}${classAttr}>`;
  });

  // Tables: keep class on table-related tags so e.g. .compare-table can style.
  h = h.replace(/<(table|thead|tbody|tfoot|tr|th|td|caption)\b([^>]*)>/gi, (_m, tag, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildClassAttr(classes);
    return `<${tag}${classAttr}>`;
  });

  // details/summary: keep class + open attribute.
  h = h.replace(/<details\b([^>]*)>/gi, (_m, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildClassAttr(classes);
    const isOpen = /\bopen\b/i.test(attrs) ? " open" : "";
    return `<details${classAttr}${isOpen}>`;
  });
  h = h.replace(/<summary\b([^>]*)>/gi, (_m, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildClassAttr(classes);
    return `<summary${classAttr}>`;
  });

  // Strip attrs on plain block/inline tags.
  const PLAIN_TAGS = [
    "p",
    "strong",
    "em",
    "hr",
    "blockquote",
    "br",
    "b",
    "i",
    "code",
    "mark",
    "abbr",
    "small",
    "sub",
    "sup",
    "u",
    "pre",
    "figure",
    "figcaption",
    "dl",
    "dt",
    "dd",
    "time",
  ];
  for (const t of PLAIN_TAGS) {
    h = h.replace(new RegExp(`<${t}\\b[^>]*>`, "gi"), `<${t}>`);
  }

  return h;
}

function dropNonAllowedTags(html) {
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
    const lower = tag.toLowerCase();
    if (ALLOWED_TAGS.has(lower)) return match;
    return "";
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function fuzzyMatchAnchor(headingText, anchorMap) {
  const t = headingText
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const a of anchorMap) {
    for (const kw of a.keywords) {
      if (t.includes(kw)) return a.id;
    }
  }
  return null;
}

export function injectH2Ids(html, anchorMap) {
  const headings = [];
  const re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]*>/g, "").trim();
    headings.push({ text, id: "", start: m.index, end: m.index + m[0].length });
  }
  if (anchorMap) {
    if (headings.length !== anchorMap.length) {
      return {
        html,
        headings: headings.map((h) => ({ id: h.id, text: h.text })),
        ok: false,
        reason: `Expected ${anchorMap.length} h2, got ${headings.length}`,
      };
    }
    const usedIds = new Set();
    for (const h of headings) {
      const id = fuzzyMatchAnchor(h.text, anchorMap);
      if (!id) {
        return {
          html,
          headings: headings.map((x) => ({ id: x.id, text: x.text })),
          ok: false,
          reason: `No anchor map for "${h.text}"`,
        };
      }
      if (usedIds.has(id)) {
        return {
          html,
          headings: headings.map((x) => ({ id: x.id, text: x.text })),
          ok: false,
          reason: `Duplicate anchor ${id} (text: "${h.text}")`,
        };
      }
      usedIds.add(id);
      h.id = id;
    }
  } else {
    // De-duplicate slug ids (e.g. two "What's next" headings → -2 suffix).
    const usedIds = new Set();
    for (const h of headings) {
      let base = slugify(h.text);
      if (!base) base = "section";
      let candidate = base;
      let i = 2;
      while (usedIds.has(candidate)) {
        candidate = `${base}-${i++}`;
      }
      usedIds.add(candidate);
      h.id = candidate;
    }
  }
  let cursor = 0;
  const parts = [];
  for (const h of headings) {
    parts.push(html.slice(cursor, h.start));
    parts.push(`<h2 id="${h.id}">${h.text}</h2>`);
    cursor = h.end;
  }
  parts.push(html.slice(cursor));
  return {
    html: parts.join(""),
    headings: headings.map((h) => ({ id: h.id, text: h.text })),
    ok: true,
  };
}

export function injectSatelliteLinks(html, links) {
  const sectionRe = /<h2 id="([^"]+)">[\s\S]*?<\/h2>/g;
  const matches = [];
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    matches.push({
      id: m[1],
      headingStart: m.index,
      headingEnd: m.index + m[0].length,
    });
  }
  let result = "";
  for (let i = 0; i < matches.length; i++) {
    const sec = matches[i];
    const next = matches[i + 1];
    const sectionEnd = next ? next.headingStart : html.length;
    if (i === 0) result += html.slice(0, matches[0].headingStart);
    let block = html.slice(sec.headingStart, sectionEnd);
    const sectionLinks = links[sec.id] || [];
    if (sectionLinks.length) {
      const linkHtml = sectionLinks
        .map(
          (l) => `<p><em>&rarr; Deep dive: <a href="${l.href}">${l.title}</a></em></p>`
        )
        .join("\n");
      const lastClose = block.lastIndexOf("</p>");
      if (lastClose >= 0) {
        const insertAt = lastClose + "</p>".length;
        block =
          block.slice(0, insertAt) + "\n" + linkHtml + "\n" + block.slice(insertAt);
      } else {
        block = block + "\n" + linkHtml + "\n";
      }
    }
    result += block;
  }
  return result;
}

/**
 * Run the full pipeline.
 * @param {string} rawHtml — the raw CJGEO HTML to sanitize.
 * @param {object} [options]
 * @param {Array<{id:string, keywords:string[]}>} [options.anchorMap]
 *   Locked anchor ids (pillar). Omit for slug-from-text on satellites.
 * @param {Record<string, Array<{href:string, title:string}>>} [options.satelliteLinks]
 *   Inline deep-dive links keyed by anchor id.
 * @param {boolean} [options.strictAnchors=true]
 *   When anchorMap is supplied and the mapping fails, throw.
 * @returns {{ html: string, headings: Array<{id:string,text:string}>, wordCount: number }}
 */
export function sanitizeCJGEO(rawHtml, options = {}) {
  let h = rawHtml;
  h = stripScaffoldingAndChrome(h);
  h = unwrapSections(h);
  h = cleanAttributesAndUnwrap(h);
  h = dropNonAllowedTags(h);
  h = h.replace(/\n{3,}/g, "\n\n").trim();

  const anchored = injectH2Ids(h, options.anchorMap);
  if (!anchored.ok) {
    if (options.strictAnchors !== false) {
      throw new Error(`anchor map failed: ${anchored.reason}`);
    }
  }
  h = anchored.html;

  if (options.satelliteLinks) {
    h = injectSatelliteLinks(h, options.satelliteLinks);
  }

  const wordCount = h
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ").length;
  return { html: h, headings: anchored.headings, wordCount };
}

export default sanitizeCJGEO;
