// CJGEO → bryanblog HTML sanitizer.
//
// The OLD sanitizer (strip-everything) flattened CJGEO's rich structural elements
// (callout boxes, comparison-table badge indicators, layered-income visuals,
// checklists) into a "wall of text". This sanitizer takes the opposite approach:
// CURATED PRESERVATION. We keep CJGEO's semantically meaningful class names on
// known wrapper elements and rely on bryanblog's `.prose-article` CSS to give
// them editorial styling that matches bryanblog's palette.
//
// Strip rules:
//   - Document scaffolding (<!DOCTYPE>, html/head/body/main/article)
//   - Non-content nodes: <style>, <script>, comments
//   - CJGEO page chrome: hero section, site-header, site-footer, footer-cta,
//     toc-box (bryanblog renders its own TOC via ArticleShell), cta-section
//     (bryanblog renders its own <Cta> component)
//   - All <h1> in body (title renders in ArticleShell)
//
// Preservation rules:
//   - Tables (table/thead/tbody/tr/th/td) with structure intact, including the
//     span.ind badge indicators inside cells
//   - <div class="callout callout-blue|callout-warm"> + <div class="callout-title">
//   - <div class="comparison-wrap"> + nested <table>
//   - <div class="income-layers"> + <div class="income-layer layer-N"> +
//     <div class="layer-label"> + <div class="layer-content">
//   - <ul class="checklist"> + checkmark SVGs (inline, allowed inside checklists only)
//   - <span class="ind ind-good|ind-moderate|ind-limited|ind-yes|ind-no">

const PRESERVED_CLASSES = new Set([
  // Callouts
  "callout",
  "callout-blue",
  "callout-warm",
  "callout-title",
  // Comparison table wrapper
  "comparison-wrap",
  // Layered income visual
  "income-layers",
  "income-layer",
  "layer-label",
  "layer-content",
  "layer-1",
  "layer-2",
  "layer-3",
  "layer-4",
  "layer-5",
  "layer-6",
  // Checklist
  "checklist",
  "check-icon",
  // Badge indicators (inline)
  "ind",
  "ind-good",
  "ind-moderate",
  "ind-limited",
  "ind-yes",
  "ind-no",
]);

// CJGEO classes that mean "this is page chrome, drop it entirely (with contents)".
const DROP_BLOCK_CLASSES = new Set([
  "hero",
  "hero-inner",
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
  "toc-box",
  "toc-heading",
  "cta-section",
  "article-meta",
  "article-label",
  "article-title",
  "article-subtitle",
]);

// Allowed top-level tags (after curated-div pass).
const ALLOWED_TAGS = new Set([
  "h2",
  "h3",
  "h4",
  "p",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "hr",
  "blockquote",
  "div", // only kept if has a preserved class
  "span", // only kept if has a preserved class (badge indicators)
  "strong",
  "em",
  "a",
  "br",
  "b",
  "i",
  "svg", // kept inside checklist <li> for the check-icon
  "circle",
  "path",
]);

function getClassList(attrs) {
  const m = attrs.match(/\bclass\s*=\s*"([^"]+)"/i);
  if (!m) return [];
  return m[1].split(/\s+/).filter(Boolean);
}

function buildPreservedClassAttr(classes) {
  const kept = classes.filter((c) => PRESERVED_CLASSES.has(c));
  return kept.length ? ` class="${kept.join(" ")}"` : "";
}

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
  h = h.replace(/<figure[\s\S]*?<\/figure>/gi, "");
  h = h.replace(/<h1[\s\S]*?<\/h1>/gi, "");

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
  let h = html;
  h = h.replace(/<section\b[^>]*>/gi, "");
  h = h.replace(/<\/section>/gi, "");
  return h;
}

function cleanAttributesAndUnwrap(html) {
  let h = html;

  // Process span tags innermost-first. Iterate until stable.
  let prev;
  do {
    prev = h;
    h = h.replace(
      /<span\b([^>]*)>((?:(?!<span\b)[\s\S])*?)<\/span>/gi,
      (_m, attrs, inner) => {
        const classes = getClassList(attrs);
        const classAttr = buildPreservedClassAttr(classes);
        if (classAttr) return `<span${classAttr}>${inner}</span>`;
        return inner;
      }
    );
  } while (h !== prev);

  // Process div tags innermost-first (this rewrites divs without nested divs,
  // and unwraps non-preserved divs entirely so their content surfaces).
  do {
    prev = h;
    h = h.replace(
      /<div\b([^>]*)>((?:(?!<div\b)[\s\S])*?)<\/div>/gi,
      (_m, attrs, inner) => {
        const classes = getClassList(attrs);
        const classAttr = buildPreservedClassAttr(classes);
        if (classAttr) return `<div${classAttr}>${inner}</div>`;
        return inner;
      }
    );
  } while (h !== prev);

  // After the inner-first pass, any remaining <div> opening tag whose body
  // still contains preserved-class child divs (e.g. outer "income-layers"
  // wrapping preserved "income-layer" children) was never matched as
  // "innermost". Walk all remaining <div ...> opening tags and rewrite their
  // attrs to keep only the preserved class. Closing tags </div> stay.
  h = h.replace(/<div\b([^>]*)>/gi, (_m, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildPreservedClassAttr(classes);
    return `<div${classAttr}>`;
  });

  // Handle <a>: keep href only.
  h = h.replace(/<a\b([^>]*)>/gi, (_m, attrs) => {
    const m = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
    const href = m ? (m[2] !== undefined ? m[2] : m[3]) : "";
    return href ? `<a href="${href}">` : "<a>";
  });

  // SVG attribute allowlist. `class` is filtered separately (preserved-class only)
  // so check-icon survives but other classes don't.
  const SVG_ALLOWED_ATTRS = new Set([
    "viewBox",
    "fill",
    "xmlns",
    "aria-hidden",
    "cx",
    "cy",
    "r",
    "d",
    "stroke",
    "stroke-width",
    "stroke-linecap",
    "stroke-linejoin",
    "width",
    "height",
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
        const kept = val.split(/\s+/).filter((c) => PRESERVED_CLASSES.has(c));
        if (kept.length) out.push(`class="${kept.join(" ")}"`);
      }
    }
    return out.length ? " " + out.join(" ") : "";
  }
  h = h.replace(/<(svg|circle|path)\b([^>]*)(\/?)>/gi, (_m, tag, attrs, slash) => {
    return `<${tag}${filterSvgAttrs(attrs)}${slash}>`;
  });

  // Strip attrs on h2/h3/h4 (anchor ids re-injected in a later pass).
  h = h.replace(/<(h2|h3|h4)\b[^>]*>/gi, (_m, tag) => `<${tag}>`);

  // <ul> and <ol>: preserve class if it's a preserved class (e.g. "checklist").
  h = h.replace(/<(ul|ol)\b([^>]*)>/gi, (_m, tag, attrs) => {
    const classes = getClassList(attrs);
    const classAttr = buildPreservedClassAttr(classes);
    return `<${tag}${classAttr}>`;
  });

  // Strip attrs on plain block/inline tags.
  const PLAIN_TAGS = [
    "p",
    "li",
    "strong",
    "em",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "hr",
    "blockquote",
    "br",
    "b",
    "i",
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
    for (const h of headings) h.id = slugify(h.text);
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
