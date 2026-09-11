import type { Language } from '../data/seo';
import { infoPages, infoPath, infoLabels, type InfoPage } from '../data/info';
import { shellCopy } from '../data/locales';

export default function SiteLinks({ language, current }: { language: Language; current?: InfoPage }) {
  return <nav className="site-links" aria-label={shellCopy[language].siteInfo}>
    {infoPages.map((page) => <a key={page} href={infoPath(language, page)} aria-current={page === current ? 'page' : undefined}>{infoLabels[language][page]}</a>)}
  </nav>;
}
