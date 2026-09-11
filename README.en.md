<div align="center">
  <img src="public/favicon.svg" width="84" height="84" alt="PicSizeKit logo" />
  <h1>PicSizeKit</h1>
  <p><strong>Crop, resize, convert and compress images in your browser.</strong></p>
  <p>Your images never reach a server. No account required.</p>

  <p>
    <a href="README.md">简体中文</a>
    ·
    <a href="README.en.md"><strong>English</strong></a>
  </p>

  <p>
    <img alt="Astro" src="https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
    <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white" />
    <img alt="License" src="https://img.shields.io/github/license/cutelitchi/Vela" />
  </p>
</div>

---

## About

PicSizeKit is a privacy-first image utility. Decoding, cropping, resizing, conversion and compression all happen inside the visitor's browser. The server delivers static site assets and never receives the images being processed.

Website: [picsizekit.com](https://picsizekit.com)

## Features

| Feature | Details |
| --- | --- |
| Drag, drop and batch select | Import multiple JPEG, PNG and WebP images |
| Precise sizing | Resize by pixels or percentage and lock the aspect ratio |
| Visual crop tool | Common screen ratios, 1.85:1/2.35:1/2.39:1 cinema formats and Chinese ID photo presets |
| Touch cropping | Drag to move, resize with 44px corner targets or pinch with two fingers; selection stays within the image |
| Theater preview | Double-click the crop area to preview exactly what is inside the selection; double-click again or press Esc to exit |
| Format conversion | Export JPEG, PNG or WebP |
| Photo frames | 8 muted colors, top/bottom or all sides, 0–512px borders and custom RGB; borders extend the canvas and appear in previews and downloads |
| Quality control | Quality slider for JPEG and WebP; lossless PNG output |
| Live size comparison | See estimated output dimensions, file size and savings while changing size, format or quality |
| Process and download | Progress appears on the main button, which becomes an animated download prompt when ready; individual files or batch ZIP |
| Configure before import | Explore and adjust all settings before choosing images; your preferences carry over |
| Compact workspace | Side-by-side panels without a separate queue; switch batch previews with a compact selector |
| EXIF privacy | Private metadata is removed by default; JPEG → JPEG preservation is optional |
| Five languages | Dedicated English, Simplified Chinese, Japanese, Spanish and Traditional Chinese URLs; switching languages preserves images and settings |
| Search-friendly pages | Localized titles, descriptions, canonical URLs, hreflang, static guides and an automatically generated sitemap |

## Privacy model

```text
Choose local images
        ↓
Decode and crop in the browser
        ↓
Resize, encode and compress in the browser
        ↓
Download a local Blob or ZIP
```

- Image content is never sent to PicSizeKit, Cloudflare or another server.
- No account is required.
- Results use temporary Blob URLs that disappear when the page closes.
- The URL determines the page language; no saved language preference is required.

## Image tools and search visibility

Site information: [About](https://picsizekit.com/about/) · [Contact](https://picsizekit.com/contact/) · [Privacy policy](https://picsizekit.com/privacy/). All three pages are available in five languages. Contact: [henuqin@gmail.com](mailto:henuqin@gmail.com). The privacy policy separates local image processing, hosting requests, email feedback and future advertising; update it and consent controls when enabling ads.

Languages: [English](https://picsizekit.com/) · [简体中文](https://picsizekit.com/zh/) · [日本語](https://picsizekit.com/ja/) · [Español](https://picsizekit.com/es/) · [繁體中文](https://picsizekit.com/zh-hant/). Each language has four tool pages and three information pages, totaling 35 URLs. Locale configuration lives in `src/data/locales.ts`, and new translations in `src/data/translations/`. No runtime translation service is used.

To test production output, finish `npm run build` first, then run `TEST_PREVIEW=1 npm test`. Avoid running a build concurrently with development-server tests because they share caches.

| Tool | English | 中文 |
| --- | --- | --- |
| Resize, crop and convert | [Open](https://picsizekit.com/) | [打开](https://picsizekit.com/zh/) |
| Image compression | [Open](https://picsizekit.com/compress-image/) | [打开](https://picsizekit.com/zh/compress-image/) |
| WebP to JPG | [Open](https://picsizekit.com/webp-to-jpg/) | [打开](https://picsizekit.com/zh/webp-to-jpg/) |
| Photo borders | [Open](https://picsizekit.com/add-border-to-photo/) | [打开](https://picsizekit.com/zh/add-border-to-photo/) |

Each entry starts with appropriate editor settings and includes a unique guide and FAQ in the initial HTML. Language switches retain the current images and settings; switching to another tool starts that tool's preset workspace. Refreshing or closing the page discards the local session.

After deployment, verify the domain in Google Search Console, submit `https://picsizekit.com/sitemap.xml`, and use URL Inspection to check indexing. These account-side steps are separate from deployment; neither a sitemap nor ads.txt guarantees indexing or ranking. Copy and route definitions live in `src/data/seo.ts`.

## Stack

- [Astro](https://astro.build/) for static output and fast page delivery.
- [React](https://react.dev/) for the interactive image workspace.
- [react-image-crop](https://github.com/dominictobias/react-image-crop) for the movable, resizable crop box.
- [pica](https://github.com/nodeca/pica) for high-quality browser-side resizing.
- [fflate](https://github.com/101arrowz/fflate) for batch ZIP downloads.
- [piexifjs](https://github.com/hMatoba/piexifjs) for optional JPEG metadata preservation.

## Local development

Node.js 22 or newer is recommended.

```bash
npm install
npm run dev
```

Run type checks and build the production site:

```bash
npm run build
```

The static output is written to `dist/`.

## Deploy to Cloudflare Pages

1. Connect `cutelitchi/Vela` in Cloudflare Pages.
2. Set the production branch to `main`.
3. Use `npm run build` as the build command.
4. Use `dist` as the build output directory.
5. Attach `picsizekit.com` after the first successful deployment.

The site is fully static and requires no KV, D1, R2 or server environment variables.

## Browser support

Use a current stable release of Chrome, Edge, Firefox or Safari. Very large images are limited by the visitor's device memory and processing power.

## License

The project is distributed under the repository's [LICENSE](LICENSE).

## Crop regression tests

With Chrome installed, run `npm test`. Tests generate local fixtures and cover touch corners, pinch resizing, bounds, gesture cancellation, downloads, desktop mouse resizing and theater preview. Browser emulation does not replace testing on a physical iPhone.
