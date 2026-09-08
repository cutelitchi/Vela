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
| Visual crop tool | Common screen ratios plus Small 1-inch, 1-inch, Passport, 2-inch and Large 2-inch Chinese ID photo presets |
| Theater preview | Double-click the crop area for a distraction-free dark preview; double-click again or press Esc to exit |
| Format conversion | Export JPEG, PNG or WebP |
| Quality control | Quality slider for JPEG and WebP; lossless PNG output |
| Live size comparison | See estimated output dimensions, file size and savings while changing size, format or quality |
| Flexible downloads | Download one image or package all results into a ZIP |
| EXIF privacy | Private metadata is removed by default; JPEG → JPEG preservation is optional |
| Bilingual UI | Switch between Chinese and English from the page header with a saved local preference |

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
- The language preference is the only value stored in `localStorage`.

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
