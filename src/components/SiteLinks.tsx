import type { Language } from '../data/seo';
import { infoPages, infoPath, infoLabels, type InfoPage } from '../data/info';

export default function SiteLinks({ language, current }: { language: Language; current?: InfoPage }) {
  return <nav className="site-links" aria-label={language === 'zh' ? '网站信息' : 'Site information'}>
    {infoPages.map((page) => <a key={page} href={infoPath(language, page)} aria-current={page === current ? 'page' : undefined}>{infoLabels[language][page]}</a>)}
  </nav>;
}
