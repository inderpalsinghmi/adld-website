/**
 * ADLD Center — Notion CMS Library
 *
 * Fetches content from Notion at build time.
 * All exports are async and run only during `astro build` — never in the browser.
 *
 * Notion page structure expected under NOTION_ROOT_PAGE_ID:
 *   Root Page
 *   ├── index                   → src/pages/index.astro
 *   │   ├── patient-p1
 *   │   ├── patient-p2
 *   │   ├── patient-p3
 *   │   ├── patient-p4
 *   │   ├── patient-p5
 *   │   ├── researchers-body
 *   │   └── pharma-body
 *   ├── about                   → src/pages/about.astro
 *   │   └── about-body
 *   ├── team                    → src/pages/team.astro
 *   │   ├── team-leadership
 *   │   └── team-partners
 *   ├── resources               → src/pages/resources.astro
 *   │   └── resources-body
 *   ├── research-roadmap        → src/pages/research-roadmap.astro
 *   │   ├── roadmap-t1
 *   │   ├── roadmap-t2
 *   │   ├── roadmap-t3
 *   │   └── roadmap-t4
 *   └── natural-history-study   → src/pages/natural-history-study.astro
 *       ├── nhs-what-is
 *       ├── nhs-participate
 *       └── nhs-faq
 *
 * To add a new section:
 *   1. Add a child page under the right parent in Notion (title = section key)
 *   2. Add <Fragment set:html={s['my-section']} /> in the .astro page template
 *   No code changes to this file needed.
 *
 * To add a new page:
 *   1. Create the .astro page in src/pages/
 *   2. Add a parent page under the root in Notion (title = filename without .astro)
 *   No code changes to this file needed.
 */

import { Client } from '@notionhq/client';

// ─── Client ─────────────────────────────────────────────────────────────────

function getNotion() {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new Client({ auth: token });
}

// ─── Notion blocks → styled HTML ────────────────────────────────────────────

function richText(rtArr) {
  return (rtArr || []).map(rt => {
    let t = rt.plain_text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    if (rt.annotations?.bold)   t = `<strong class="text-[#0a2342]">${t}</strong>`;
    if (rt.annotations?.italic) t = `<em>${t}</em>`;
    if (rt.annotations?.code)   t = `<code class="bg-gray-100 px-1 rounded text-sm">${t}</code>`;
    if (rt.href)                 t = `<a href="${rt.href}" class="text-blue-600 underline" target="_blank" rel="noreferrer">${t}</a>`;
    return t;
  }).join('');
}

function blocksToHtml(blocks) {
  const out = [];
  let bullets = [];
  let numbered = [];

  function flushBullets() {
    if (!bullets.length) return;
    out.push(`<ul class="space-y-3 mb-5">\n${bullets.join('\n')}\n</ul>`);
    bullets = [];
  }
  function flushNumbered() {
    if (!numbered.length) return;
    const items = numbered.map((item, i) =>
      `  <div class="flex items-start gap-4">\n` +
      `    <span class="w-8 h-8 rounded-full bg-[#0a2342] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${i + 1}</span>\n` +
      `    <div class="pt-1 text-[0.9rem] text-gray-600 leading-relaxed">${item}</div>\n` +
      `  </div>`
    );
    out.push(`<div class="space-y-4 mb-5">\n${items.join('\n')}\n</div>`);
    numbered = [];
  }

  for (const b of blocks) {
    if (b.type !== 'bulleted_list_item') flushBullets();
    if (b.type !== 'numbered_list_item') flushNumbered();

    switch (b.type) {
      case 'paragraph': {
        const t = richText(b.paragraph.rich_text);
        if (t.trim()) out.push(`<p class="text-[0.93rem] text-gray-600 leading-[1.75] mb-4">${t}</p>`);
        break;
      }
      case 'heading_2':
        out.push(`<h3 class="text-base font-bold text-[#0a2342] mt-7 mb-2 pt-1">${richText(b.heading_2.rich_text)}</h3>`);
        break;
      case 'heading_3':
        out.push(`<h4 class="text-[0.93rem] font-bold text-[#0a2342] mt-5 mb-2">${richText(b.heading_3.rich_text)}</h4>`);
        break;
      case 'bulleted_list_item':
        bullets.push(
          `<li class="flex items-start gap-3"><div class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>` +
          `<span class="text-[0.92rem] text-gray-600 leading-[1.7]">${richText(b.bulleted_list_item.rich_text)}</span></li>`
        );
        break;
      case 'numbered_list_item':
        numbered.push(richText(b.numbered_list_item.rich_text));
        break;
      case 'callout': {
        const text = richText(b.callout.rich_text);
        out.push(`<div class="bg-[#0a2342] text-white rounded-xl p-5 mt-4 mb-4 text-sm leading-relaxed">${text}</div>`);
        break;
      }
      case 'quote':
        out.push(`<blockquote class="border-l-4 border-blue-300 pl-4 italic text-gray-500 my-4 text-sm leading-relaxed">${richText(b.quote.rich_text)}</blockquote>`);
        break;
      case 'divider':
        out.push(`<hr class="my-6 border-[#e8edf5]">`);
        break;
    }
  }
  flushBullets();
  flushNumbered();
  return out.join('\n');
}

// ─── Pagination-safe fetchers ────────────────────────────────────────────────

async function fetchChildPages(notion, pageId) {
  const pages = [];
  let cursor;
  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    for (const block of res.results) {
      if (block.type === 'child_page') {
        pages.push({ id: block.id, title: block.child_page.title });
      }
    }
    cursor = res.has_more ? res.next_cursor : null;
  } while (cursor);
  return pages;
}

async function fetchBlocks(notion, pageId) {
  const blocks = [];
  let cursor;
  do {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : null;
  } while (cursor);
  return blocks;
}

// ─── Root page cache (shared across all page builds in one run) ──────────────

let _rootChildrenCache = null;

async function getRootChildren(notion) {
  if (_rootChildrenCache) return _rootChildrenCache;
  const rootId = process.env.NOTION_ROOT_PAGE_ID;
  if (!rootId) return [];
  _rootChildrenCache = await fetchChildPages(notion, rootId);
  return _rootChildrenCache;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch all Notion sections for a given page name.
 *
 * Returns a plain object: { sectionKey: htmlString, ... }
 *
 * If NOTION_TOKEN / NOTION_ROOT_PAGE_ID are not set (local dev without Notion),
 * returns an empty object — the page renders with its static fallback content.
 *
 * @param {string} pageName  The Notion parent page title, e.g. 'index', 'team'
 * @returns {Promise<Record<string, string>>}
 */
export async function fetchPageSections(pageName) {
  const notion = getNotion();
  if (!notion || !process.env.NOTION_ROOT_PAGE_ID) {
    console.warn(`[notion] Skipping "${pageName}" — NOTION_TOKEN or NOTION_ROOT_PAGE_ID not set.`);
    return {};
  }

  try {
    const rootChildren = await getRootChildren(notion);
    const filePage = rootChildren.find(p => p.title === pageName);

    if (!filePage) {
      console.warn(`[notion] No page titled "${pageName}" found under root — skipping.`);
      return {};
    }

    const sectionPages = await fetchChildPages(notion, filePage.id);

    // Fetch all sections in parallel
    const entries = await Promise.all(
      sectionPages.map(async section => {
        try {
          const blocks = await fetchBlocks(notion, section.id);
          return [section.title, blocksToHtml(blocks)];
        } catch (err) {
          console.warn(`[notion] Could not fetch section "${section.title}": ${err.message}`);
          return [section.title, ''];
        }
      })
    );

    return Object.fromEntries(entries);
  } catch (err) {
    console.warn(`[notion] Failed to fetch page "${pageName}": ${err.message}`);
    return {};
  }
}
