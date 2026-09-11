export const languages = ['en', 'zh', 'ja', 'es', 'zh-Hant'] as const;
export type Language = typeof languages[number];
export type ExtraLanguage = Exclude<Language, 'en' | 'zh'>;
export const locales = {
  en: { label: 'EN', name: 'English', prefix: '/', tag: 'en', og: 'en_US' },
  zh: { label: '中文', name: '简体中文', prefix: '/zh/', tag: 'zh-Hans', og: 'zh_CN' },
  ja: { label: '日本語', name: '日本語', prefix: '/ja/', tag: 'ja', og: 'ja_JP' },
  es: { label: 'Español', name: 'Español', prefix: '/es/', tag: 'es', og: 'es_ES' },
  'zh-Hant': { label: '繁體中文', name: '繁體中文', prefix: '/zh-hant/', tag: 'zh-Hant', og: 'zh_TW' },
} as const;
export function localizedPaths(suffix = '') {
  return Object.fromEntries(languages.map((code) => [code, locales[code].prefix + suffix])) as Record<Language, string>;
}
export const shellCopy = {
  en: { guide: 'QUICK GUIDE', back: 'Back to editor ↑', faq: 'Frequently asked questions', explore: 'Explore image tools', free: 'Every tool is free, with no account required. Your images are processed in your browser.', about: 'About', contact: 'Contact', privacy: 'Privacy policy', siteInfo: 'Site information', brand: 'Local image tools', open: '← Open image tools', tools: 'Image tools', updated: 'Last updated: ', help: 'How to use & more tools ↓', language: 'Choose language' },
  zh: { guide: '使用指南', back: '返回编辑器 ↑', faq: '常见问题', explore: '更多图片工具', free: '所有工具免费使用，无需账户。图片在本地浏览器处理。', about: '关于我们', contact: '联系我们', privacy: '隐私政策', siteInfo: '网站信息', brand: '本地影像工具', open: '← 打开图片工具', tools: '图片工具', updated: '最近更新：', help: '使用指南与更多工具 ↓', language: '选择语言' },
  ja: { guide: '使い方', back: '編集画面に戻る ↑', faq: 'よくある質問', explore: 'その他の画像ツール', free: 'すべて無料・登録不要。画像はブラウザー内で処理されます。', about: 'このサイトについて', contact: 'お問い合わせ', privacy: 'プライバシーポリシー', siteInfo: 'サイト情報', brand: 'ローカル画像ツール', open: '← 画像ツールを開く', tools: '画像ツール', updated: '最終更新日：', help: '使い方とその他のツール ↓', language: '言語を選択' },
  es: { guide: 'GUÍA RÁPIDA', back: 'Volver al editor ↑', faq: 'Preguntas frecuentes', explore: 'Más herramientas de imagen', free: 'Todas las herramientas son gratuitas y no requieren cuenta. Las imágenes se procesan en tu navegador.', about: 'Acerca de', contact: 'Contacto', privacy: 'Política de privacidad', siteInfo: 'Información del sitio', brand: 'Herramientas de imagen locales', open: '← Abrir las herramientas', tools: 'Herramientas de imagen', updated: 'Última actualización: ', help: 'Guías y más herramientas ↓', language: 'Elegir idioma' },
  'zh-Hant': { guide: '使用指南', back: '返回編輯器 ↑', faq: '常見問題', explore: '更多圖片工具', free: '所有工具皆可免費使用，無須帳戶。圖片在本機瀏覽器處理。', about: '關於我們', contact: '聯絡我們', privacy: '隱私權政策', siteInfo: '網站資訊', brand: '本機圖片工具', open: '← 開啟圖片工具', tools: '圖片工具', updated: '最近更新：', help: '使用指南與更多工具 ↓', language: '選擇語言' },
};
