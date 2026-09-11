import { languages, tools, site, pagePath } from '../data/seo';
import { infoPages, infoPath } from '../data/info';

export function GET() {
  const urls = languages.flatMap((language) => [
    ...tools.map((tool) => pagePath(language, tool)),
    ...infoPages.map((page) => infoPath(language, page)),
  ]).map((path) => `<url><loc>${site}${path}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
