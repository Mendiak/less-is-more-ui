// Static site builder for the Less Is More UI showcase.
// Zero dependencies: renders the Markdown already used by the skill,
// wraps it in one shared layout and regenerates sitemap.xml and llms.txt.
import { readFile, writeFile, mkdir, stat, rm, cp, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages, nav } from './pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '_site');
const read = (file) => readFile(join(root, file), 'utf8');
const abs = (path = '') => `${site.origin}${site.base}${path}`;

// Start from a clean output directory.
await rm(outDir, { recursive: true, force: true });

async function copyFileTo(file, target) {
  const destination = join(outDir, target);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, file), destination);
}

// ---------------------------------------------------------------------------
// Markdown (small, deliberate subset)
// ---------------------------------------------------------------------------

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const slugify = (text) => text
  .replace(/<[^>]+>/g, '')
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

function renderInline(text) {
  const code = [];
  let output = text.replace(/`([^`]+)`/g, (_, value) => {
    code.push(escapeHtml(value));
    return `\u0000${code.length - 1}\u0000`;
  });

  output = escapeHtml(output);
  output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  output = output.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  output = output.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

  return output.replace(/\u0000(\d+)\u0000/g, (_, index) => `<code>${code[Number(index)]}</code>`);
}

function parseTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function buildList(items, start, level) {
  const tag = items[start].ordered ? 'ol' : 'ul';
  let html = `<${tag}>`;
  let index = start;

  while (index < items.length && items[index].level >= level) {
    const item = items[index];
    if (item.level > level) {
      index += 1;
      continue;
    }
    index += 1;

    let children = '';
    if (index < items.length && items[index].level > level) {
      const nested = buildList(items, index, items[index].level);
      children = nested.html;
      index = nested.index;
    }
    html += `<li>${renderInline(item.text)}${children}</li>`;
  }

  return { html: `${html}</${tag}>`, index };
}

function renderMarkdown(markdown, { toc = [] } = {}) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (/^\s*$/.test(line)) {
      index += 1;
      continue;
    }

    // Fenced code
    if (/^```/.test(line.trim())) {
      const language = line.trim().slice(3).trim();
      const buffer = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        buffer.push(lines[index]);
        index += 1;
      }
      index += 1;
      const langClass = language ? ` class="language-${escapeHtml(language)}"` : '';
      out.push(`<pre><code${langClass}>${escapeHtml(buffer.join('\n'))}</code></pre>`);
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      out.push('<hr>');
      index += 1;
      continue;
    }

    // Headings
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      if (level === 2 || level === 3) {
        toc.push({ level, text: text.replace(/`/g, ''), id });
      }
      out.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      index += 1;
      continue;
    }

    // Tables
    if (/^\|/.test(line) && /^\|?[\s:-]+\|/.test(lines[index + 1] || '')) {
      const header = parseTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\|/.test(lines[index])) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      const head = header.map((cell) => `<th>${renderInline(cell)}</th>`).join('');
      const body = rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('');
      out.push(`<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`);
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buffer = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        buffer.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      out.push(`<blockquote><p>${renderInline(buffer.join(' '))}</p></blockquote>`);
      continue;
    }

    // Lists
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[index])) {
        const match = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(lines[index]);
        items.push({
          level: Math.floor(match[1].length / 2),
          ordered: /\d/.test(match[2]),
          text: match[3],
        });
        index += 1;
      }
      out.push(buildList(items, 0, 0).html);
      continue;
    }

    // Paragraph
    const paragraph = [];
    while (index < lines.length && !/^\s*$/.test(lines[index]) &&
      !/^(#{1,4}\s|```|---+\s*$|>\s?|\s*([-*]|\d+\.)\s+|\|)/.test(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }

    const text = paragraph.map((part, position) => {
      const hardBreak = /  +$/.test(part);
      const rendered = renderInline(part.trim());
      if (position === paragraph.length - 1) return rendered;
      return `${rendered}${hardBreak ? '<br>' : ' '}`;
    }).join('');

    out.push(`<p>${text}</p>`);
  }

  return out.join('\n');
}

function stripLeadingTitle(markdown) {
  return markdown.replace(/^\s*#\s+[^\n]+\n+/, '');
}

const titleCase = (value) => value
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

const template = await read('site/templates/layout.html');

const navHtml = nav.map((item) => `<a href="${site.base}${item.path}">${item.label}</a>`).join('');

function breadcrumbsFor(page) {
  const parts = page.path.split('/').filter(Boolean);
  const crumbs = [{ label: 'Home', href: site.base }];
  let accumulated = '';

  parts.forEach((part, index) => {
    accumulated += `${part}/`;
    const target = pages.find((candidate) => candidate.path === accumulated);
    const label = target ? (target.crumb || target.nav) : titleCase(part);
    const isLast = index === parts.length - 1;
    crumbs.push(isLast ? { label } : { label, href: `${site.base}${accumulated}` });
  });

  return crumbs;
}

function renderBreadcrumbs(crumbs) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${crumbs.map((crumb, index) => {
    const content = crumb.href ? `<a href="${crumb.href}">${crumb.label}</a>` : `<span aria-current="page">${crumb.label}</span>`;
    return `<li>${content}${index < crumbs.length - 1 ? '<span class="separator" aria-hidden="true">/</span>' : ''}</li>`;
  }).join('')}</ol></nav>`;
}

function renderSidebar(page) {
  if (page.section !== 'docs' && page.section !== 'notes') return { html: '', toc: false };

  const siblings = pages
    .filter((candidate) => candidate.section === page.section)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const links = siblings.map((sibling) => {
    const active = sibling.path === page.path;
    return `<li><a href="${site.base}${sibling.path}"${active ? ' aria-current="page"' : ''}>${sibling.nav}</a></li>`;
  }).join('');

  const sectionLabel = page.section === 'docs' ? 'Documentation' : titleCase(page.section);
  return {
    html: `<aside class="docs-sidebar"><nav aria-label="${sectionLabel}"><p class="sidebar-title">${sectionLabel}</p><ul>${links}</ul></nav></aside>`,
    toc: true,
  };
}

function renderToc(toc) {
  if (!toc.length) return '';
  const items = toc.filter((entry) => entry.level === 2)
    .map((entry) => `<li><a href="#${entry.id}">${entry.text}</a></li>`)
    .join('');
  if (!items) return '';
  return `<nav class="page-toc" aria-label="On this page"><p class="sidebar-title">On this page</p><ul>${items}</ul></nav>`;
}

function renderPager(page) {
  if (page.section !== 'docs' && page.section !== 'notes') return '';
  const siblings = pages
    .filter((candidate) => candidate.section === page.section)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const position = siblings.findIndex((candidate) => candidate.path === page.path);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];
  if (!previous && !next) return '';

  return `<nav class="pager" aria-label="Documentation">${previous
    ? `<a class="pager-previous" href="${site.base}${previous.path}"><span>Previous</span>${previous.nav}</a>`
    : '<span></span>'}${next
    ? `<a class="pager-next" href="${site.base}${next.path}"><span>Next</span>${next.nav}</a>`
    : ''}</nav>`;
}

function renderJsonLd(page, { isArticle, faq }) {
  const graph = [{
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsFor(page).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${site.origin}${crumb.href}` } : {}),
    })),
  }];

  if (isArticle) {
    graph.push({
      '@type': 'TechArticle',
      headline: page.seoTitle,
      description: page.description,
      url: abs(page.path),
      mainEntityOfPage: abs(page.path),
      inLanguage: 'en',
      author: { '@id': `${site.origin}${site.base}#author` },
      publisher: { '@id': `${site.origin}${site.base}#author` },
      ...(page.updated ? { dateModified: page.updated.toISOString().slice(0, 10) } : {}),
    });
  } else {
    graph.push({
      '@type': 'WebPage',
      name: page.seoTitle,
      description: page.description,
      url: abs(page.path),
      inLanguage: 'en',
      isPartOf: { '@id': `${site.origin}${site.base}#website` },
    });
  }

  if (faq) graph.push(faq);

  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}</script>`;
}

const generated = [];

for (const page of pages) {
  const sourceFiles = page.sources || [];
  const markdownParts = [];

  for (const file of sourceFiles) {
    const raw = await read(file);
    markdownParts.push(page.keepTitle ? raw : stripLeadingTitle(raw));
    const info = await stat(join(root, file));
    if (!page.updated || info.mtime > page.updated) page.updated = info.mtime;
  }

  const toc = [];
  let content = '';

  if (page.html) {
    content = await read(page.html);
  } else {
    content = renderMarkdown(markdownParts.join('\n\n'), { toc });
  }

  if (page.append) {
    content += `\n${await read(page.append)}`;
  }

  // Pick up headings added as raw HTML (appended demos, FAQ, ...).
  const headingPattern = /<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
  let headingMatch;
  while ((headingMatch = headingPattern.exec(content)) !== null) {
    const id = headingMatch[1];
    if (!toc.some((entry) => entry.id === id)) {
      toc.push({ level: 2, text: headingMatch[2].replace(/<[^>]+>/g, ''), id });
    }
  }

  const crumbs = breadcrumbsFor(page);
  const sidebar = renderSidebar(page);
  const isArticle = page.section === 'docs' || page.section === 'notes';
  const faq = page.faq ? JSON.parse(await read(page.faq)) : null;
  const pageToc = sidebar.toc ? renderToc(toc) : '';

  const articleHtml = `<article class="prose"><h1>${page.title}</h1>${page.lead ? `<p class="lead">${page.lead}</p>` : ''}${content}${renderPager(page)}</article>`;

  const main = sidebar.html
    ? `<div class="docs-shell">${sidebar.html}<div class="docs-main">${renderBreadcrumbs(crumbs)}${articleHtml}${pageToc}</div></div>`
    : `<div class="page-shell">${renderBreadcrumbs(crumbs)}${articleHtml}</div>`;

  const html = template
    .replaceAll('{{LANG}}', 'en')
    .replaceAll('{{SEO_TITLE}}', page.seoTitle)
    .replaceAll('{{DESCRIPTION}}', page.description)
    .replaceAll('{{CANONICAL}}', abs(page.path))
    .replaceAll('{{OG_IMAGE}}', abs('assets/images/github-screenshot.png'))
    .replaceAll('{{OG_TYPE}}', isArticle ? 'article' : 'website')
    .replaceAll('{{NAV}}', navHtml)
    .replaceAll('{{MAIN}}', main)
    .replaceAll('{{JSONLD}}', renderJsonLd(page, { isArticle, faq }))
    .replaceAll('{{BASE}}', site.base);

  const target = join(outDir, page.path, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  generated.push({ page, html });
  console.log(`built  ${page.path || './'}`);
}

// Home is authored by hand; reuse its modification time for the sitemap.
const homeUpdated = (await stat(join(root, 'site/index.html'))).mtime;
const sitemapEntries = [{
  loc: abs(''),
  lastmod: homeUpdated.toISOString().slice(0, 10),
}, ...generated.map(({ page }) => ({
  loc: abs(page.path),
  lastmod: (page.updated || homeUpdated).toISOString().slice(0, 10),
}))];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `    <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
    </url>`).join('\n')}
</urlset>
`;
await writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('built  sitemap.xml');

// llms.txt: an index for agents that consume the site as documentation.
const llmsPages = pages.filter((page) => page.section === 'docs' || page.section === 'notes');
const llms = `# ${site.name}

> A minimalist design system and AI agent skill for calm, functional web interfaces.
> Design tokens, a CSS reset and modernist UI patterns inspired by Mies, Rams and Vignelli.

## Documentation

${llmsPages.map((page) => `- [${page.nav}](${abs(page.path)}): ${page.description}`).join('\n')}

## Source

- [GitHub](https://github.com/Mendiak/less-is-more-ui)
- [npm](https://www.npmjs.com/package/@mendiak/less-is-more-ui)
- [Skill definition](${abs('SKILL.md')})
`;
await writeFile(join(outDir, 'llms.txt'), llms, 'utf8');
console.log('built  llms.txt');

// llms-full.txt: the documentation as plain Markdown, for agent ingestion.
const fullParts = [];
for (const page of pages.filter((candidate) => candidate.section === 'docs')) {
  for (const file of page.sources || []) {
    fullParts.push(`# ${page.title}\n\n${stripLeadingTitle(await read(file))}`);
  }
}
await writeFile(join(outDir, 'llms-full.txt'), fullParts.join('\n\n---\n\n'), 'utf8');
console.log('built  llms-full.txt');

// ---------------------------------------------------------------------------
// Static assets, homepage, 404 and robots
// ---------------------------------------------------------------------------

const staticFiles = [
  ['assets/css/reset.css', 'assets/css/reset.css'],
  ['assets/css/components.css', 'assets/css/components.css'],
  ['references/tokens.css', 'references/tokens.css'],
  ['site/assets/css/style.css', 'assets/css/style.css'],
  ['site/assets/css/docs.css', 'assets/css/docs.css'],
  ['site/assets/js/main.js', 'assets/js/main.js'],
  ['site/index.html', 'index.html'],
  ['site/404.html', '404.html'],
];

for (const [file, target] of staticFiles) {
  await copyFileTo(file, target);
}

await cp(join(root, 'assets/images'), join(outDir, 'assets/images'), { recursive: true });
await writeFile(join(outDir, '.nojekyll'), '', 'utf8');

await writeFile(join(outDir, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${abs('sitemap.xml')}
`, 'utf8');
console.log('built  static assets, robots.txt');

