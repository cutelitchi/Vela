import { languages, locales, shellCopy, type Language } from '../data/locales';

export default function LanguageMenu({ language, paths }: { language: Language; paths: Record<Language, string> }) {
  return <details className="language-menu">
    <summary aria-label={shellCopy[language].language}><span aria-hidden="true">◎</span> {locales[language].label} <span aria-hidden="true">⌄</span></summary>
    <nav className="language-toggle" aria-label="Language">
      {languages.map((code) => <a key={code} href={paths[code]} hrefLang={locales[code].tag} lang={locales[code].tag} aria-current={language === code ? 'page' : undefined} className={language === code ? 'active' : ''} onClick={(event) => { const menu = event.currentTarget.closest('details'); if (menu) menu.open = false; }}>{locales[code].name}</a>)}
    </nav>
  </details>;
}
