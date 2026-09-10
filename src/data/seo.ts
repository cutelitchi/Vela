export type Language = 'en' | 'zh';
export type Tool = 'home' | 'compress-image' | 'webp-to-jpg' | 'add-border-to-photo';
export const languages: Language[] = ['en', 'zh'];
export const tools: Tool[] = ['home', 'compress-image', 'webp-to-jpg', 'add-border-to-photo'];
export const site = 'https://picsizekit.com';
export function pagePath(language: Language, tool: Tool = 'home') {
  return `${language === 'zh' ? '/zh/' : '/'}${tool === 'home' ? '' : `${tool}/`}`;
}

type Content = {
  title: string; description: string; headline: string; intro: string; label: string;
  guideTitle: string; steps: string[]; tip: string; faqs: [string, string][];
};
export const content: Record<Language, Record<Tool, Content>> = {
  en: {
    home: {
      title: 'Free Image Resizer, Cropper & Compressor | PicSizeKit',
      description: 'Resize, crop and compress images online for free. Convert JPG, PNG and WebP, add photo frames, and download in batches. No uploads or sign-up.',
      headline: 'Free Online Image Resizer & Compressor',
      intro: 'Resize, crop, convert and frame images in your browser. Free, private, and no sign-up required.',
      label: 'All image tools', guideTitle: 'How to resize an image online',
      steps: ['Choose one or more JPG, PNG or WebP images from your device.', 'Crop to a preset or custom ratio, then set the output size in pixels or percent. Choose your format and quality.', 'Compare the estimated file size and dimensions, process your images, and download a file or batch ZIP.'],
      tip: 'For example, with a 2400 × 1600 crop area, choose Percent and enter 50 to export at 1200 × 800 before any added border. To keep the entire image, first extend the crop to the image edges. Enlarging an image does not recover missing detail.',
      faqs: [
        ['Which image format should I choose?', 'JPEG is useful for photos when transparency is unnecessary. PNG preserves transparency and uses lossless compression. WebP supports transparency and adjustable quality; check that your destination accepts it.'],
        ['Are my photos uploaded?', 'No. Image processing happens in your browser. Your selected files and generated images are not uploaded to PicSizeKit. Save your downloads before closing the page.'],
        ['Can I keep image metadata?', 'Private EXIF metadata is removed by default. You can switch this off for JPEG-to-JPEG processing; preservation across different formats is not guaranteed.'],
      ],
    },
    'compress-image': {
      title: 'Compress Images Online Free — JPG & WebP | PicSizeKit',
      description: 'Compress JPG and WebP images in your browser. Adjust quality, compare file sizes and dimensions, and download individually or as a ZIP. No uploads.',
      headline: 'Compress Images Online for Free',
      intro: 'Adjust quality and compare file sizes before downloading. Your images stay on your device.',
      label: 'Compress images', guideTitle: 'How to reduce image file size',
      steps: ['Choose your images. This tool starts with WebP output, 82% quality and 100% scale.', 'Move the quality slider and compare Before with Estimated output. Lower the scale if you also want fewer pixels.', 'Process the images and download the results. Multiple images are packaged in a ZIP.'],
      tip: 'A photo that is already heavily compressed may not become smaller when re-encoded. Compare the actual estimate. Quality is an encoder setting, not a guaranteed percentage reduction in file size.',
      faqs: [
        ['Can I compress an image to exactly 100 KB?', 'There is no automatic target-size mode. Adjust quality and dimensions while watching the estimated size until it fits your limit.'],
        ['Does compression change the image dimensions?', 'The default 100% scale keeps the crop dimensions. Reducing quality alone does not reduce the pixel count. Cropping, resizing or adding a frame changes the dimensions.'],
        ['Why is there no PNG quality slider?', 'PNG output uses lossless compression. To reduce its size further, reduce the dimensions or choose WebP or JPEG. JPEG removes transparency.'],
      ],
    },
    'webp-to-jpg': {
      title: 'Convert WebP to JPG Online Free | PicSizeKit',
      description: 'Convert WebP images to JPG locally in your browser. Adjust JPEG quality, compare output size and batch download. Free, with no uploads or account.',
      headline: 'Convert WebP to JPG Online',
      intro: 'Make WebP photos easier to share with JPEG output. Convert single images or a batch, locally.',
      label: 'WebP to JPG', guideTitle: 'How to convert WebP to JPG',
      steps: ['Select your WebP files. JPEG output and 100% scale are already selected.', 'Choose JPEG quality and review the estimated file size. Keep the original crop to retain the full image.', 'Process and download the JPG file, or a ZIP containing your converted images.'],
      tip: 'JPG and JPEG refer to the same image format. JPEG cannot store transparency; transparent areas are filled with white. Conversion can increase file size and does not restore detail lost in the source.',
      faqs: [
        ['Will a transparent background stay transparent?', 'No. This converter fills transparent areas with white for JPEG output. Choose PNG or WebP in the editor if you need transparency.'],
        ['Can I convert animated WebP files?', 'The editor produces still images, not animations. An animated source will not retain its animation in the exported image.'],
        ['Can I convert several WebP images at once?', 'Yes. Select multiple files, apply the output settings, then process and download the ZIP. Very large batches are limited by your device memory.'],
      ],
    },
    'add-border-to-photo': {
      title: 'Add a Border to a Photo Online Free | PicSizeKit',
      description: 'Add square-corner photo borders in your browser. Choose all sides or top and bottom, 8 muted colors, custom RGB and pixel width. No uploads.',
      headline: 'Add a Border to Your Photos',
      intro: 'Frame your photos with precise pixel widths, muted colors or custom RGB. Preview before downloading.',
      label: 'Add photo borders', guideTitle: 'How to add a border to a photo',
      steps: ['Choose your photo. A 32-pixel ivory border on all sides is enabled to get you started.', 'Choose all sides or top and bottom. Adjust the width with the slider or pixel input, and pick a preset color or custom RGB.', 'Double-click or double-tap the crop for a theater preview, then process and download the framed image.'],
      tip: 'Borders are added outside the image. A 1200 × 800 image with a 32-pixel border on all sides becomes 1264 × 864. Top-and-bottom borders produce 1200 × 864. Corners are square.',
      faqs: [
        ['Does the frame cover part of my photo?', 'No. The frame extends the canvas around the processed image, so it does not cover the crop contents. The final dimensions include the border.'],
        ['Can I add white or black borders?', 'Yes. Use the custom RGB inputs: 255, 255, 255 for white or 0, 0, 0 for black. Eight muted preset colors are also available.'],
        ['Can I make a cinema-style image?', 'Choose a cinema crop ratio such as 1.85:1, 2.35:1 or 2.39:1, then add top-and-bottom borders. The crop ratio applies to the image content; adding borders changes the final canvas ratio.'],
      ],
    },
  },
  zh: {
    home: {
      title: '免费在线图片缩放、裁剪与压缩工具 | PicSizeKit',
      description: '免费在线调整图片尺寸、裁剪和压缩，支持 JPG、PNG、WebP 格式转换、添加相框及批量下载。图片仅在本地浏览器处理，无需上传或注册。',
      headline: '免费在线图片缩放与压缩工具',
      intro: '在浏览器中缩放、裁剪、转换图片和添加相框。免费使用，无需上传或注册。',
      label: '全部图片工具', guideTitle: '如何在线调整图片尺寸',
      steps: ['从设备中选择一张或多张 JPG、PNG 或 WebP 图片。', '按预设或自定义比例裁剪，以像素或百分比设置输出尺寸，再选择格式和压缩质量。', '对比预计体积与像素尺寸，处理后下载单张图片或批量 ZIP。'],
      tip: '例如，裁剪区域为 2400 × 1600 时，选择百分比并输入 50，未添加边框时输出为 1200 × 800。如需保留完整画面，请先将裁剪框扩展至图片边缘。放大图片不会恢复原图中缺失的细节。',
      faqs: [
        ['JPG、PNG 和 WebP 应该怎么选？', '照片不需要透明背景时可选 JPEG；PNG 支持透明背景和无损压缩；WebP 支持透明背景与可调压缩质量，使用前请确认接收平台支持。'],
        ['我的照片会被上传吗？', '不会。图片处理在浏览器中完成，所选文件和生成的图片不会上传到 PicSizeKit。关闭页面前请保存下载结果。'],
        ['可以保留照片元数据吗？', '默认删除 EXIF 隐私信息。JPEG 转 JPEG 时可关闭此选项来保留元数据，跨格式转换不保证完整保留。'],
      ],
    },
    'compress-image': {
      title: '免费在线图片压缩 — JPG 与 WebP 体积调整 | PicSizeKit',
      description: '在本地浏览器压缩 JPG、WebP 图片，调整质量并实时对比处理前后体积和像素，支持单张及批量 ZIP 下载，无需上传。',
      headline: '免费在线压缩图片', intro: '调整压缩质量，下载前对比图片体积。图片始终留在你的设备上。',
      label: '图片压缩', guideTitle: '如何减小图片文件体积',
      steps: ['选择图片。此页面默认使用 WebP 输出、82% 质量和 100% 缩放。', '移动质量滑块，对比处理前与预计输出；如需减少像素，可同时降低缩放百分比。', '处理完成后下载结果，多张图片将打包为 ZIP。'],
      tip: '已经高度压缩的照片再次编码后不一定更小，请以实时估算为准。质量数值是编码参数，不代表文件体积一定按相同比例缩小。',
      faqs: [
        ['可以自动压缩到 100 KB 吗？', '目前没有自动指定目标体积的模式。可以调整质量和尺寸，观察预计体积，直到满足限制。'],
        ['压缩会改变像素尺寸吗？', '默认 100% 缩放保持裁剪区域的像素尺寸。仅降低质量不会减少像素，裁剪、缩放或添加边框则会改变尺寸。'],
        ['为什么 PNG 没有质量滑块？', 'PNG 输出使用无损压缩。如需进一步减小体积，可降低尺寸或选择 WebP、JPEG；JPEG 不支持透明背景。'],
      ],
    },
    'webp-to-jpg': {
      title: '免费在线 WebP 转 JPG — 本地批量转换 | PicSizeKit',
      description: '在浏览器中将 WebP 转换为 JPG，支持调整 JPEG 质量、对比输出体积和批量下载。免费使用，图片无需上传，无需注册。',
      headline: '在线将 WebP 转换为 JPG', intro: '将 WebP 照片转换为方便分享的 JPEG，支持单张或批量本地处理。',
      label: 'WebP 转 JPG', guideTitle: '如何将 WebP 转换为 JPG',
      steps: ['选择 WebP 文件，页面已预选 JPEG 输出和 100% 缩放。', '调整 JPEG 质量并查看预计体积，保持原始裁剪可保留完整画面。', '处理后下载 JPG 文件，或下载包含多张转换结果的 ZIP。'],
      tip: 'JPG 和 JPEG 指同一种图片格式。JPEG 无法保存透明度，透明区域会填充为白色。转换可能增大体积，也不会恢复原图已丢失的细节。',
      faqs: [
        ['透明背景会保留吗？', '不会。输出 JPEG 时透明区域会填充为白色；需要保留透明度时，请在编辑器中选择 PNG 或 WebP。'],
        ['支持保留动态 WebP 的动画吗？', '编辑器输出静态图片，不会保留输入图片的动画。'],
        ['可以一次转换多个文件吗？', '可以。选择多个文件并设置输出参数，处理后下载 ZIP。大型图片和批次的处理能力受设备内存限制。'],
      ],
    },
    'add-border-to-photo': {
      title: '免费在线给照片加边框 — 自定义颜色与宽度 | PicSizeKit',
      description: '在线为照片添加直角边框，支持四周全包或仅上下、8 种稳重配色、自定义 RGB 颜色及像素宽度，本地处理无需上传。',
      headline: '在线为照片添加边框', intro: '按像素设置边框宽度，选择稳重配色或自定义 RGB，预览后下载。',
      label: '照片加边框', guideTitle: '如何为照片添加边框',
      steps: ['选择照片，页面已开启四周 32 像素暖白边框。', '选择四周全包或仅上下，滑动或输入像素调整宽度，再选择预设颜色或自定义 RGB。', '双击或连续轻点两次裁剪区域进入影院预览，确认后处理并下载。'],
      tip: '边框加在图片外侧。1200 × 800 的图片添加四周 32 像素边框后为 1264 × 864；仅上下添加则为 1200 × 864。边框使用直角。',
      faqs: [
        ['边框会遮挡照片内容吗？', '不会。边框扩展处理后图片的画布，不遮挡裁剪内容；最终像素尺寸包含边框。'],
        ['可以添加纯白或纯黑边框吗？', '可以。自定义 RGB 输入 255、255、255 为白色，0、0、0 为黑色，也可使用 8 种稳重预设配色。'],
        ['如何制作电影画幅效果？', '选择 1.85:1、2.35:1 或 2.39:1 等电影裁剪比例，再添加上下边框。裁剪比例针对画面内容，添加边框后最终画布比例会改变。'],
      ],
    },
  },
};
