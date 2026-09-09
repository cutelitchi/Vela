<div align="center">
  <img src="public/favicon.svg" width="84" height="84" alt="PicSizeKit logo" />
  <h1>PicSizeKit</h1>
  <p><strong>浏览器内完成图片裁剪、缩放、转换与压缩。</strong></p>
  <p>图片不会上传服务器。无需账户，即开即用。</p>

  <p>
    <a href="README.md"><strong>简体中文</strong></a>
    ·
    <a href="README.en.md">English</a>
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

## 项目简介

PicSizeKit 是一个隐私优先的在线图片处理工具。图片解码、裁剪、缩放、格式转换和压缩全部发生在访问者的浏览器中；服务器只分发静态网页资源，不接收用户图片。

访问地址：[picsizekit.com](https://picsizekit.com)

## 功能

| 功能 | 说明 |
| --- | --- |
| 拖拽与批量选择 | 支持 JPEG、PNG、WebP，可同时导入多张图片 |
| 精确尺寸 | 按像素或百分比缩放，可锁定宽高比例 |
| 可视化裁剪 | 内置常见屏幕比例、1.85:1/2.35:1/2.39:1 电影画幅及常用中国证件照比例，并支持自定义比例 |
| 触摸裁剪 | 支持单指拖动、44px 角点触摸区域和双指缩放，裁剪范围保持在图片内 |
| 影院预览 | 双击裁剪区，全屏预览选框中的内容；双击或按 Esc 退出 |
| 格式转换 | 输出 JPEG、PNG 或 WebP |
| 相框 | 8 种沉稳配色，支持仅上下或四周全包、0–512px 边宽与自定义 RGB；外加边框不遮挡图片，预览和下载包含相框 |
| 质量控制 | JPEG 与 WebP 支持质量调节；PNG 保持无损输出 |
| 实时体积对比 | 调整尺寸、格式或压缩质量时，动态显示预计输出像素、文件大小和节省比例 |
| 处理与下载 | 主按钮显示处理进度，完成后动态提示点击下载；单张直接下载，多张打包 ZIP |
| 上传前配置 | 无需选择图片即可查看并调整全部设置，导入后保留预设参数 |
| 紧凑工作区 | 左右分栏、无独立图片队列；批量图片通过下拉菜单切换预览 |
| EXIF 隐私 | 默认删除位置、设备型号和拍摄时间等元数据；JPEG → JPEG 可选择保留 |
| 中英文界面 | 页面顶部一键切换，并保存本机语言偏好 |

## 隐私设计

```text
选择本地图片
      ↓
浏览器解码与裁剪
      ↓
浏览器缩放、编码与压缩
      ↓
Blob / ZIP 本地下载
```

- 图片内容不会发送至 PicSizeKit、Cloudflare 或其他服务器。
- 不需要注册账户。
- 处理结果使用临时 Blob URL，页面关闭后自动失效。
- 语言偏好只保存在浏览器的 `localStorage` 中。

## 技术栈

- [Astro](https://astro.build/)：生成静态页面并优化加载性能。
- [React](https://react.dev/)：图片工作台交互。
- [react-image-crop](https://github.com/dominictobias/react-image-crop)：可拖动、可缩放的裁剪范围框。
- [pica](https://github.com/nodeca/pica)：高质量浏览器端图片缩放。
- [fflate](https://github.com/101arrowz/fflate)：批量结果 ZIP 打包。
- [piexifjs](https://github.com/hMatoba/piexifjs)：JPEG 元数据保留处理。

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

类型检查并生成生产文件：

```bash
npm run build
```

构建结果位于 `dist/`。

## 部署到 Cloudflare Pages

1. 在 Cloudflare Pages 中连接 `cutelitchi/Vela`。
2. Production branch 选择 `main`。
3. Build command 填写 `npm run build`。
4. Build output directory 填写 `dist`。
5. 部署完成后绑定 `picsizekit.com`。

项目是纯静态站点，不需要 KV、D1、R2 或服务器环境变量。

## 浏览器支持

建议使用当前稳定版本的 Chrome、Edge、Firefox 或 Safari。超大图片的处理速度和内存占用取决于访问者设备性能。

## License

本项目按照仓库中的 [LICENSE](LICENSE) 授权。

## 裁剪回归测试

安装 Chrome 后运行 `npm test`。测试使用本地生成的图片，覆盖手机触摸四角、双指缩放、边界限制、取消手势、结果下载，以及桌面鼠标和影院预览。浏览器模拟测试不能替代 iPhone 真机验证。
