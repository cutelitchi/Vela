import { useEffect, useMemo, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type PercentCrop,
} from 'react-image-crop';
import pica from 'pica';
import { zipSync } from 'fflate';
import piexif from 'piexifjs';
import 'react-image-crop/dist/ReactCrop.css';

type Language = 'zh' | 'en';
type OutputFormat = 'jpeg' | 'png' | 'webp';
type ResizeMode = 'pixels' | 'percent';

type ImageItem = {
  id: string;
  file: File;
  sourceUrl: string;
  width: number;
  height: number;
  outputBlob?: Blob;
  outputUrl?: string;
  outputWidth?: number;
  outputHeight?: number;
  error?: string;
};

const dictionaries = {
  zh: {
    brandNote: '本地影像工具',
    headline: '精准调整每一张图片。',
    intro: '裁剪、缩放、转换与压缩都在你的设备上完成。',
    privacy: '图片仅在您的浏览器中处理，不会上传到服务器。',
    choose: '拖拽图片到这里，或点击选择',
    chooseNote: '支持 JPEG、PNG、WebP，可一次选择多张',
    addMore: '继续添加',
    workspace: '工作区',
    source: '原图',
    result: '结果',
    cropRatio: '裁剪比例',
    original: '原始',
    custom: '自定义',
    customRatio: '自定义比例',
    resize: '输出尺寸',
    pixels: '像素',
    percent: '百分比',
    width: '宽度',
    height: '高度',
    scale: '缩放',
    lock: '锁定比例',
    format: '输出格式',
    quality: '压缩质量',
    pngHint: 'PNG 使用无损压缩，不会降低画质。',
    metadata: '删除 EXIF 隐私信息',
    metadataHint: '移除位置、设备型号和拍摄时间等信息。',
    preserveHint: '关闭后支持 JPEG → JPEG 保留元数据；跨格式转换可能无法完整保留。',
    process: '处理图片',
    processing: '正在处理…',
    download: '下载',
    downloadAll: '下载全部 ZIP',
    remove: '移除',
    clear: '清空',
    images: '张图片',
    before: '处理前',
    after: '处理后',
    saved: '节省',
    waiting: '调整参数后点击“处理图片”生成结果',
    cropHelp: '拖动或缩放选框来决定保留范围。',
    settings: '处理设置',
    queue: '图片队列',
    localBadge: 'LOCAL ONLY',
    errorType: '请选择 JPEG、PNG 或 WebP 图片。',
    errorRead: '无法读取图片。',
    errorProcess: '处理失败，请尝试较小的图片。',
    footer: '无需账户 · 无需上传 · 图片不会离开您的设备',
  },
  en: {
    brandNote: 'Local image tools',
    headline: 'Resize every image with precision.',
    intro: 'Crop, resize, convert and compress directly on your device.',
    privacy: 'Your images are processed only in your browser and never uploaded.',
    choose: 'Drop images here, or click to choose',
    chooseNote: 'JPEG, PNG and WebP supported — select multiple files',
    addMore: 'Add more',
    workspace: 'Workspace',
    source: 'Original',
    result: 'Result',
    cropRatio: 'Crop ratio',
    original: 'Original',
    custom: 'Custom',
    customRatio: 'Custom ratio',
    resize: 'Output size',
    pixels: 'Pixels',
    percent: 'Percent',
    width: 'Width',
    height: 'Height',
    scale: 'Scale',
    lock: 'Lock ratio',
    format: 'Output format',
    quality: 'Compression quality',
    pngHint: 'PNG uses lossless compression and keeps visual quality.',
    metadata: 'Remove private EXIF data',
    metadataHint: 'Removes location, device model, capture time and related metadata.',
    preserveHint: 'When off, metadata preservation is supported for JPEG → JPEG. Cross-format conversion may not retain everything.',
    process: 'Process images',
    processing: 'Processing…',
    download: 'Download',
    downloadAll: 'Download all as ZIP',
    remove: 'Remove',
    clear: 'Clear',
    images: 'images',
    before: 'Before',
    after: 'After',
    saved: 'saved',
    waiting: 'Adjust the settings, then process the images to see results',
    cropHelp: 'Move or resize the selection to choose what stays.',
    settings: 'Processing settings',
    queue: 'Image queue',
    localBadge: 'LOCAL ONLY',
    errorType: 'Please choose JPEG, PNG or WebP images.',
    errorRead: 'This image could not be read.',
    errorProcess: 'Processing failed. Try a smaller image.',
    footer: 'No account · No upload · Your images never leave your device',
  },
} as const;

const ratioPresets = [
  { key: 'original', value: 0, label: 'Original' },
  { key: '1:1', value: 1, label: '1:1' },
  { key: '4:3', value: 4 / 3, label: '4:3' },
  { key: '3:4', value: 3 / 4, label: '3:4' },
  { key: '3:2', value: 3 / 2, label: '3:2' },
  { key: '2:3', value: 2 / 3, label: '2:3' },
  { key: '16:9', value: 16 / 9, label: '16:9' },
  { key: '9:16', value: 9 / 16, label: '9:16' },
  { key: 'custom', value: -1, label: 'Custom' },
] as const;

const picaInstance = pica({ features: ['js', 'wasm', 'ww'] });

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

function clampDimension(value: number) {
  return Math.min(16384, Math.max(1, Math.round(value || 1)));
}

function fileToDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string) {
  const [header, content] = dataUrl.split(',');
  const mime = header.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';
  const binary = atob(content);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: mime });
}

async function preserveJpegMetadata(original: File, output: Blob) {
  try {
    const [sourceData, outputData] = await Promise.all([
      fileToDataUrl(original),
      fileToDataUrl(output),
    ]);
    const exif = piexif.load(sourceData);
    const zeroth = exif['0th'];
    if (!zeroth || Object.keys(zeroth).length === 0) return output;
    zeroth[String(piexif.ImageIFD.Orientation)] = 1;
    return dataUrlToBlob(piexif.insert(piexif.dump(exif), outputData));
  } catch {
    return output;
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function centeredCrop(width: number, height: number, aspect: number): PercentCrop {
  if (!aspect) return { unit: '%', x: 0, y: 0, width: 100, height: 100 };
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 88 }, aspect, width, height),
    width,
    height,
  );
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  );
}

function IconLock({ locked }: { locked: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      {locked ? <path d="M8 10V7a4 4 0 0 1 8 0v3" /> : <path d="M16 10V7a4 4 0 0 0-7.8-1.3" />}
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
    </svg>
  );
}

export default function ImageStudio() {
  const [language, setLanguage] = useState<Language>('zh');
  const [items, setItems] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [crops, setCrops] = useState<Record<string, PercentCrop>>({});
  const [ratioKey, setRatioKey] = useState('original');
  const [customRatio, setCustomRatio] = useState({ width: 5, height: 4 });
  const [resizeMode, setResizeMode] = useState<ResizeMode>('pixels');
  const [targetWidth, setTargetWidth] = useState(1920);
  const [targetHeight, setTargetHeight] = useState(1080);
  const [scalePercent, setScalePercent] = useState(100);
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState<OutputFormat>('webp');
  const [quality, setQuality] = useState(82);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState('');
  const [previewView, setPreviewView] = useState<'source' | 'result'>('source');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const t = dictionaries[language];

  useEffect(() => {
    const saved = window.localStorage.getItem('picsizekit-language');
    if (saved === 'en' || saved === 'zh') setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('picsizekit-language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh'
      ? 'PicSizeKit — 隐私优先的图片裁剪、缩放与压缩工具'
      : 'PicSizeKit — Private image resize, crop & compress';
  }, [language]);

  useEffect(() => {
    setPreviewView('source');
  }, [selectedId]);

  useEffect(() => () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.sourceUrl);
      if (item.outputUrl) URL.revokeObjectURL(item.outputUrl);
    });
  }, []);

  const activeAspect = useMemo(() => {
    if (!selected) return 1;
    if (ratioKey === 'original') return selected.width / selected.height;
    if (ratioKey === 'custom') return Math.max(0.01, customRatio.width / customRatio.height);
    return ratioPresets.find((preset) => preset.key === ratioKey)?.value || selected.width / selected.height;
  }, [selected, ratioKey, customRatio]);

  const currentCrop = selected
    ? crops[selected.id] ?? centeredCrop(selected.width, selected.height, activeAspect)
    : undefined;

  async function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    const accepted = files.filter((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type));
    if (accepted.length !== files.length) setNotice(t.errorType);
    if (!accepted.length) return;

    const loaded = await Promise.all(accepted.map(async (file) => {
      const sourceUrl = URL.createObjectURL(file);
      try {
        const image = await loadImage(sourceUrl);
        return { id: uid(), file, sourceUrl, width: image.naturalWidth, height: image.naturalHeight } satisfies ImageItem;
      } catch {
        URL.revokeObjectURL(sourceUrl);
        return null;
      }
    }));
    const valid = loaded.filter((item): item is ImageItem => Boolean(item));
    if (!valid.length) {
      setNotice(t.errorRead);
      return;
    }
    setItems((current) => [...current, ...valid]);
    setSelectedId((current) => current || valid[0].id);
    if (items.length === 0) {
      setTargetWidth(valid[0].width);
      setTargetHeight(valid[0].height);
    }
    setNotice('');
  }

  function updateRatio(nextKey: string) {
    setRatioKey(nextKey);
    if (!selected) return;
    const nextAspect = nextKey === 'original'
      ? selected.width / selected.height
      : nextKey === 'custom'
        ? customRatio.width / customRatio.height
        : ratioPresets.find((preset) => preset.key === nextKey)?.value || 1;
    setCrops((current) => ({ ...current, [selected.id]: centeredCrop(selected.width, selected.height, nextAspect) }));
    if (locked) setTargetHeight(clampDimension(targetWidth / nextAspect));
  }

  function updateCustomRatio(part: 'width' | 'height', value: number) {
    const next = { ...customRatio, [part]: Math.max(1, value || 1) };
    setCustomRatio(next);
    if (ratioKey === 'custom' && selected) {
      const aspect = next.width / next.height;
      setCrops((current) => ({ ...current, [selected.id]: centeredCrop(selected.width, selected.height, aspect) }));
      if (locked) setTargetHeight(clampDimension(targetWidth / aspect));
    }
  }

  function updateWidth(value: number) {
    const nextWidth = clampDimension(value);
    setTargetWidth(nextWidth);
    if (locked) setTargetHeight(clampDimension(nextWidth / activeAspect));
  }

  function updateHeight(value: number) {
    const nextHeight = clampDimension(value);
    setTargetHeight(nextHeight);
    if (locked) setTargetWidth(clampDimension(nextHeight * activeAspect));
  }

  async function processItem(item: ImageItem) {
    const image = await loadImage(item.sourceUrl);
    const crop = crops[item.id] ?? centeredCrop(item.width, item.height, ratioKey === 'original' ? item.width / item.height : activeAspect);
    const sx = Math.max(0, Math.round((crop.x / 100) * item.width));
    const sy = Math.max(0, Math.round((crop.y / 100) * item.height));
    const sw = Math.max(1, Math.min(item.width - sx, Math.round((crop.width / 100) * item.width)));
    const sh = Math.max(1, Math.min(item.height - sy, Math.round((crop.height / 100) * item.height)));
    const outputWidth = resizeMode === 'percent'
      ? clampDimension(sw * scalePercent / 100)
      : targetWidth;
    const outputHeight = resizeMode === 'percent'
      ? clampDimension(sh * scalePercent / 100)
      : targetHeight;

    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = sw;
    sourceCanvas.height = sh;
    const context = sourceCanvas.getContext('2d', { alpha: format !== 'jpeg' });
    if (!context) throw new Error('Canvas unavailable');
    if (format === 'jpeg') {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, sw, sh);
    }
    context.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = outputWidth;
    outputCanvas.height = outputHeight;
    await picaInstance.resize(sourceCanvas, outputCanvas, {
      quality: 3,
      unsharpAmount: outputWidth < sw ? 80 : 0,
      unsharpRadius: 0.6,
      unsharpThreshold: 2,
    });
    const mime = `image/${format}`;
    let outputBlob = await picaInstance.toBlob(outputCanvas, mime, format === 'png' ? undefined : quality / 100);
    if (!stripMetadata && item.file.type === 'image/jpeg' && format === 'jpeg') {
      outputBlob = await preserveJpegMetadata(item.file, outputBlob);
    }
    return { outputBlob, outputWidth, outputHeight };
  }

  async function processAll() {
    if (!items.length) return;
    setProcessing(true);
    setNotice('');
    const results: ImageItem[] = [];
    for (const item of items) {
      try {
        const result = await processItem(item);
        if (item.outputUrl) URL.revokeObjectURL(item.outputUrl);
        results.push({
          ...item,
          ...result,
          outputUrl: URL.createObjectURL(result.outputBlob),
          error: undefined,
        });
      } catch {
        results.push({ ...item, error: t.errorProcess });
      }
    }
    setItems(results);
    if (results.some((item) => item.outputBlob)) setPreviewView('result');
    setProcessing(false);
  }

  function outputFilename(item: ImageItem) {
    const base = item.file.name.replace(/\.[^.]+$/, '') || 'image';
    const extension = format === 'jpeg' ? 'jpg' : format;
    return `${base}-picsizekit.${extension}`;
  }

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadZip() {
    const completed = items.filter((item) => item.outputBlob);
    if (!completed.length) return;
    const entries: Record<string, Uint8Array> = {};
    for (const item of completed) {
      entries[outputFilename(item)] = new Uint8Array(await item.outputBlob!.arrayBuffer());
    }
    triggerDownload(new Blob([zipSync(entries)], { type: 'application/zip' }), 'picsizekit-images.zip');
  }

  function removeItem(id: string) {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.sourceUrl);
        if (target.outputUrl) URL.revokeObjectURL(target.outputUrl);
      }
      const next = current.filter((item) => item.id !== id);
      if (selectedId === id) setSelectedId(next[0]?.id ?? '');
      return next;
    });
    setCrops((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      URL.revokeObjectURL(item.sourceUrl);
      if (item.outputUrl) URL.revokeObjectURL(item.outputUrl);
    });
    setItems([]);
    setCrops({});
    setSelectedId('');
  }

  const completedCount = items.filter((item) => item.outputBlob).length;

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="PicSizeKit home">
          <span className="brand-mark"><span /></span>
          <span>
            <strong>PicSizeKit</strong>
            <small>{t.brandNote}</small>
          </span>
        </a>
        <div className="header-actions">
          <span className="local-chip"><i /> {t.localBadge}</span>
          <div className="language-toggle" aria-label="Language">
            <button className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中文</button>
            <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>
      </header>

      <section className="intro-strip">
        <div>
          <span className="section-index">01 / IMAGE LAB</span>
          <h1>{t.headline}</h1>
          <p>{t.intro}</p>
        </div>
        <div className="privacy-note">
          <span className="privacy-icon">✓</span>
          <p>{t.privacy}</p>
        </div>
      </section>

      {items.length === 0 ? (
        <section
          className={`drop-zone ${dragging ? 'dragging' : ''}`}
          onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => { event.preventDefault(); setDragging(false); }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            void addFiles(event.dataTransfer.files);
          }}
        >
          <button className="drop-action" onClick={() => fileInputRef.current?.click()}>
            <span className="upload-icon"><IconUpload /></span>
            <strong>{t.choose}</strong>
            <small>{t.chooseNote}</small>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
            onChange={(event) => event.target.files && void addFiles(event.target.files)}
          />
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          {notice && <p className="notice error">{notice}</p>}
        </section>
      ) : (
        <>
          <section className="workspace-heading">
            <div><span className="section-index">02 / {t.workspace.toUpperCase()}</span></div>
            <div className="workspace-actions">
              <button className="button subtle" onClick={() => fileInputRef.current?.click()}><IconUpload />{t.addMore}</button>
              <button className="button subtle danger" onClick={clearAll}>{t.clear}</button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                hidden
                onChange={(event) => event.target.files && void addFiles(event.target.files)}
              />
            </div>
          </section>

          <section className="workspace-grid">
            <div className="preview-panel panel">
              <div className="panel-heading">
                <div className="preview-tabs">
                  <button className={previewView === 'source' ? 'active' : ''} onClick={() => setPreviewView('source')}>{t.source}</button>
                  {selected?.outputUrl && <button className={previewView === 'result' ? 'active' : ''} onClick={() => setPreviewView('result')}>{t.result}</button>}
                </div>
                <span className="dimension-readout">
                  {previewView === 'result' && selected?.outputWidth
                    ? `${selected.outputWidth} × ${selected.outputHeight}`
                    : `${selected?.width} × ${selected?.height}`} PX
                </span>
              </div>
              <div className="crop-stage">
                {selected && previewView === 'source' && (
                  <ReactCrop
                    crop={currentCrop}
                    aspect={activeAspect}
                    minWidth={24}
                    onChange={(_, percentCrop) => setCrops((current) => ({ ...current, [selected.id]: percentCrop }))}
                    keepSelection
                  >
                    <img src={selected.sourceUrl} alt={selected.file.name} draggable={false} />
                  </ReactCrop>
                )}
                {selected?.outputUrl && previewView === 'result' && (
                  <img className="result-preview" src={selected.outputUrl} alt={`${selected.file.name} ${t.result}`} />
                )}
              </div>
              <div className="crop-help">
                <span>{previewView === 'source' ? '↗' : '✓'}</span>
                {previewView === 'source' || !selected?.outputBlob
                  ? t.cropHelp
                  : `${t.before} ${formatBytes(selected.file.size)} · ${t.after} ${formatBytes(selected.outputBlob.size)}`}
              </div>
            </div>

            <aside className="settings-panel panel">
              <div className="panel-heading">
                <strong>{t.settings}</strong>
                <span className="step-count">01—04</span>
              </div>

              <div className="control-section">
                <label className="control-label"><b>01</b>{t.cropRatio}</label>
                <div className="ratio-grid">
                  {ratioPresets.map((preset) => (
                    <button
                      key={preset.key}
                      className={ratioKey === preset.key ? 'active' : ''}
                      onClick={() => updateRatio(preset.key)}
                    >
                      {preset.key === 'original' ? t.original : preset.key === 'custom' ? t.custom : preset.label}
                    </button>
                  ))}
                </div>
                {ratioKey === 'custom' && (
                  <div className="custom-ratio">
                    <input aria-label={`${t.customRatio} ${t.width}`} type="number" min="1" value={customRatio.width} onChange={(event) => updateCustomRatio('width', Number(event.target.value))} />
                    <span>:</span>
                    <input aria-label={`${t.customRatio} ${t.height}`} type="number" min="1" value={customRatio.height} onChange={(event) => updateCustomRatio('height', Number(event.target.value))} />
                  </div>
                )}
              </div>

              <div className="control-section">
                <label className="control-label"><b>02</b>{t.resize}</label>
                <div className="segmented">
                  <button className={resizeMode === 'pixels' ? 'active' : ''} onClick={() => setResizeMode('pixels')}>{t.pixels}</button>
                  <button className={resizeMode === 'percent' ? 'active' : ''} onClick={() => setResizeMode('percent')}>{t.percent}</button>
                </div>
                {resizeMode === 'pixels' ? (
                  <div className="dimension-fields">
                    <label>{t.width}<span><input type="number" min="1" max="16384" value={targetWidth} onChange={(event) => updateWidth(Number(event.target.value))} /> px</span></label>
                    <button className={`lock-button ${locked ? 'active' : ''}`} aria-label={t.lock} title={t.lock} onClick={() => setLocked((value) => !value)}><IconLock locked={locked} /></button>
                    <label>{t.height}<span><input type="number" min="1" max="16384" value={targetHeight} onChange={(event) => updateHeight(Number(event.target.value))} /> px</span></label>
                  </div>
                ) : (
                  <div className="range-control">
                    <div><span>{t.scale}</span><strong>{scalePercent}%</strong></div>
                    <input type="range" min="5" max="200" step="5" value={scalePercent} onChange={(event) => setScalePercent(Number(event.target.value))} />
                  </div>
                )}
              </div>

              <div className="control-section">
                <label className="control-label"><b>03</b>{t.format}</label>
                <div className="format-grid">
                  {(['jpeg', 'png', 'webp'] as OutputFormat[]).map((value) => (
                    <button key={value} className={format === value ? 'active' : ''} onClick={() => setFormat(value)}>{value === 'jpeg' ? 'JPEG' : value.toUpperCase()}</button>
                  ))}
                </div>
                {format === 'png' ? <p className="hint">{t.pngHint}</p> : (
                  <div className="range-control quality">
                    <div><span>{t.quality}</span><strong>{quality}</strong></div>
                    <input type="range" min="20" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} />
                  </div>
                )}
              </div>

              <div className="control-section metadata-control">
                <label className="control-label"><b>04</b>{t.metadata}</label>
                <button
                  role="switch"
                  aria-checked={stripMetadata}
                  className={`switch ${stripMetadata ? 'active' : ''}`}
                  onClick={() => setStripMetadata((value) => !value)}
                ><span /></button>
                <p className="hint">{stripMetadata ? t.metadataHint : t.preserveHint}</p>
              </div>

              <button className="process-button" disabled={processing} onClick={() => void processAll()}>
                <span>{processing ? t.processing : t.process}</span>
                <span>→</span>
              </button>
              {notice && <p className="notice error">{notice}</p>}
            </aside>
          </section>

          <section className="queue-section panel">
            <div className="panel-heading queue-heading">
              <strong>{t.queue} <span>{items.length} {t.images}</span></strong>
              {completedCount > 1 && <button className="button primary" onClick={() => void downloadZip()}><IconDownload />{t.downloadAll}</button>}
            </div>
            <div className="queue-list">
              {items.map((item) => {
                const savedPercent = item.outputBlob ? Math.round((1 - item.outputBlob.size / item.file.size) * 100) : 0;
                return (
                  <article key={item.id} className={`queue-item ${item.id === selected?.id ? 'selected' : ''}`} onClick={() => setSelectedId(item.id)}>
                    <img src={item.sourceUrl} alt="" />
                    <div className="queue-name">
                      <strong title={item.file.name}>{item.file.name}</strong>
                      <span>{item.width} × {item.height} · {formatBytes(item.file.size)}</span>
                    </div>
                    {item.outputBlob ? (
                      <div className="queue-result">
                        <span>{item.outputWidth} × {item.outputHeight}</span>
                        <strong>{formatBytes(item.outputBlob.size)}</strong>
                        <em className={savedPercent >= 0 ? 'positive' : 'negative'}>{savedPercent >= 0 ? '−' : '+'}{Math.abs(savedPercent)}%</em>
                      </div>
                    ) : item.error ? <span className="item-error">{item.error}</span> : <span className="waiting">{t.waiting}</span>}
                    <div className="queue-buttons">
                      {item.outputBlob && <button aria-label={t.download} title={t.download} onClick={(event) => { event.stopPropagation(); triggerDownload(item.outputBlob!, outputFilename(item)); }}><IconDownload /></button>}
                      <button aria-label={t.remove} title={t.remove} onClick={(event) => { event.stopPropagation(); removeItem(item.id); }}>×</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}

      <footer>
        <span>PicSizeKit / 2026</span>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}
