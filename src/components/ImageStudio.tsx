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

type LiveEstimate = {
  itemId: string;
  blob: Blob;
  url: string;
  width: number;
  height: number;
};

const dictionaries = {
  zh: {
    brandNote: '本地影像工具',
    headline: '精准调整每一张图片。',
    intro: '裁剪、缩放、转换与压缩都在你的设备上完成。',
    privacy: '图片仅在您的浏览器中处理，不会上传到服务器。',
    choose: '拖拽图片到这里，或点击选择',
    chooseNote: '支持 JPEG、PNG、WebP，可一次选择多张',
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
    liveComparison: '实时对比',
    estimated: '预计输出',
    estimating: '计算中…',
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
    previewHelp: '双击图片进入影院预览',
    theaterHelp: '双击图片或按 Esc 退出影院预览',
    theaterLoading: '正在生成裁剪区域预览…',
    cinemaRatios: '经典电影画幅',
    photoRatios: '中国常用证件照',
    photoRatioHint: '预设按毫米尺寸锁定裁剪比例，提交前请核对办理方的像素要求。',
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
    liveComparison: 'Live comparison',
    estimated: 'Estimated output',
    estimating: 'Calculating…',
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
    previewHelp: 'Double-click the image for theater preview',
    theaterHelp: 'Double-click the image or press Esc to exit',
    theaterLoading: 'Preparing the cropped-area preview…',
    cinemaRatios: 'Classic cinema ratios',
    photoRatios: 'Common Chinese ID photos',
    photoRatioHint: 'Presets lock the crop ratio by millimeter size. Confirm the required pixel dimensions before submission.',
    settings: 'Processing settings',
    queue: 'Image queue',
    localBadge: 'LOCAL ONLY',
    errorType: 'Please choose JPEG, PNG or WebP images.',
    errorRead: 'This image could not be read.',
    errorProcess: 'Processing failed. Try a smaller image.',
    footer: 'No account · No upload · Your images never leave your device',
  },
} as const;

const standardRatioPresets = [
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

const chinaPhotoPresets = [
  { key: 'cn-small-1', value: 22 / 32, labelZh: '小1寸', labelEn: 'Small 1-inch', size: '22×32 mm' },
  { key: 'cn-1', value: 25 / 35, labelZh: '1寸', labelEn: '1-inch', size: '25×35 mm' },
  { key: 'cn-passport', value: 33 / 48, labelZh: '小2寸 / 护照', labelEn: 'Passport', size: '33×48 mm' },
  { key: 'cn-2', value: 35 / 49, labelZh: '2寸', labelEn: '2-inch', size: '35×49 mm' },
  { key: 'cn-large-2', value: 35 / 53, labelZh: '大2寸', labelEn: 'Large 2-inch', size: '35×53 mm' },
] as const;

const cinemaRatioPresets = [
  { key: 'cinema-1.85', value: 1.85, label: '1.85:1', noteZh: '院线宽银幕', noteEn: 'Cinema flat' },
  { key: 'cinema-2.35', value: 2.35, label: '2.35:1', noteZh: '经典宽银幕', noteEn: 'Classic scope' },
  { key: 'cinema-2.39', value: 2.39, label: '2.39:1', noteZh: '现代宽银幕', noteEn: 'Modern scope' },
] as const;

const ratioPresets = [...standardRatioPresets, ...cinemaRatioPresets, ...chinaPhotoPresets] as const;

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
  const [language, setLanguage] = useState<Language>('en');
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
  const [liveEstimate, setLiveEstimate] = useState<LiveEstimate>();
  const [estimating, setEstimating] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [theaterLoading, setTheaterLoading] = useState(false);
  const [theaterPreviewUrl, setTheaterPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const estimateUrlRef = useRef<string | undefined>(undefined);
  const estimateJobRef = useRef(0);
  const theaterUrlRef = useRef<string | undefined>(undefined);
  const theaterJobRef = useRef(0);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const t = dictionaries[language];

  useEffect(() => {
    const saved = window.localStorage.getItem('picsizekit-language-v2');
    if (saved === 'en' || saved === 'zh') setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('picsizekit-language-v2', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh'
      ? 'PicSizeKit — 隐私优先的图片裁剪、缩放与压缩工具'
      : 'PicSizeKit — Private image resize, crop & compress';
  }, [language]);

  useEffect(() => {
    setPreviewView('source');
  }, [selectedId]);

  useEffect(() => {
    if (!theaterMode) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTheater();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [theaterMode]);

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

  const cropSignature = currentCrop
    ? `${currentCrop.x.toFixed(3)}:${currentCrop.y.toFixed(3)}:${currentCrop.width.toFixed(3)}:${currentCrop.height.toFixed(3)}`
    : '';

  useEffect(() => {
    if (!selected) {
      if (estimateUrlRef.current) URL.revokeObjectURL(estimateUrlRef.current);
      estimateUrlRef.current = undefined;
      setLiveEstimate(undefined);
      setEstimating(false);
      return;
    }
    const jobId = ++estimateJobRef.current;
    setEstimating(true);
    const timer = window.setTimeout(async () => {
      try {
        const result = await processItem(selected);
        if (jobId !== estimateJobRef.current) return;
        const url = URL.createObjectURL(result.outputBlob);
        if (estimateUrlRef.current) URL.revokeObjectURL(estimateUrlRef.current);
        estimateUrlRef.current = url;
        setLiveEstimate({
          itemId: selected.id,
          blob: result.outputBlob,
          url,
          width: result.outputWidth,
          height: result.outputHeight,
        });
      } catch {
        if (jobId === estimateJobRef.current) setLiveEstimate(undefined);
      } finally {
        if (jobId === estimateJobRef.current) setEstimating(false);
      }
    }, 260);
    return () => window.clearTimeout(timer);
  }, [selectedId, cropSignature, resizeMode, targetWidth, targetHeight, scalePercent, format, quality, stripMetadata, ratioKey, activeAspect]);

  useEffect(() => () => {
    if (estimateUrlRef.current) URL.revokeObjectURL(estimateUrlRef.current);
    if (theaterUrlRef.current) URL.revokeObjectURL(theaterUrlRef.current);
  }, []);

  async function createTheaterPreview(item: ImageItem) {
    const image = await loadImage(item.sourceUrl);
    const crop = crops[item.id] ?? centeredCrop(
      item.width,
      item.height,
      ratioKey === 'original' ? item.width / item.height : activeAspect,
    );
    const sx = Math.max(0, Math.round((crop.x / 100) * item.width));
    const sy = Math.max(0, Math.round((crop.y / 100) * item.height));
    const sw = Math.max(1, Math.min(item.width - sx, Math.round((crop.width / 100) * item.width)));
    const sh = Math.max(1, Math.min(item.height - sy, Math.round((crop.height / 100) * item.height)));
    const scale = Math.min(1, 2400 / Math.max(sw, sh));
    const canvas = document.createElement('canvas');
    canvas.width = clampDimension(sw * scale);
    canvas.height = clampDimension(sh * scale);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return picaInstance.toBlob(canvas, 'image/webp', 0.92);
  }

  async function openTheater() {
    if (!selected) return;
    const item = selected;
    const jobId = ++theaterJobRef.current;
    if (theaterUrlRef.current) URL.revokeObjectURL(theaterUrlRef.current);
    theaterUrlRef.current = undefined;
    setTheaterPreviewUrl(undefined);
    setTheaterLoading(true);
    setTheaterMode(true);
    try {
      const blob = await createTheaterPreview(item);
      if (jobId !== theaterJobRef.current) return;
      const url = URL.createObjectURL(blob);
      theaterUrlRef.current = url;
      setTheaterPreviewUrl(url);
    } catch {
      if (jobId === theaterJobRef.current) {
        closeTheater();
        setNotice(t.errorProcess);
      }
    } finally {
      if (jobId === theaterJobRef.current) setTheaterLoading(false);
    }
  }

  function closeTheater() {
    theaterJobRef.current += 1;
    if (theaterUrlRef.current) URL.revokeObjectURL(theaterUrlRef.current);
    theaterUrlRef.current = undefined;
    setTheaterPreviewUrl(undefined);
    setTheaterLoading(false);
    setTheaterMode(false);
  }

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
    if (estimateUrlRef.current) URL.revokeObjectURL(estimateUrlRef.current);
    estimateUrlRef.current = undefined;
    setLiveEstimate(undefined);
    closeTheater();
  }

  const completedCount = items.filter((item) => item.outputBlob).length;
  const selectedEstimate = liveEstimate?.itemId === selected?.id ? liveEstimate : undefined;
  const previewResultUrl = selectedEstimate?.url ?? selected?.outputUrl;
  const previewResultWidth = selectedEstimate?.width ?? selected?.outputWidth;
  const previewResultHeight = selectedEstimate?.height ?? selected?.outputHeight;
  const previewResultSize = selectedEstimate?.blob.size ?? selected?.outputBlob?.size;
  const estimatedSavings = selected && previewResultSize
    ? Math.round((1 - previewResultSize / selected.file.size) * 100)
    : undefined;

  return (
    <main className={`app-shell ${items.length ? 'has-workspace' : ''}`}>
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
          <div className="language-toggle" aria-label="Language / 语言">
            <button aria-pressed={language === 'zh'} className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中文</button>
            <button aria-pressed={language === 'en'} className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>
      </header>

      <section className={`intro-strip ${items.length ? 'workspace-active' : ''}`}>
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
              <button className="button subtle danger" onClick={clearAll}>{t.clear}</button>
            </div>
          </section>

          <section className="workspace-grid">
            <div className="preview-panel panel">
              <div className="panel-heading">
                <div className="preview-tabs">
                  <button className={previewView === 'source' ? 'active' : ''} onClick={() => setPreviewView('source')}>{t.source}</button>
                  {previewResultUrl && <button className={previewView === 'result' ? 'active' : ''} onClick={() => setPreviewView('result')}>{t.result}</button>}
                </div>
                <span className="dimension-readout">
                  {previewView === 'result' && previewResultWidth
                    ? `${previewResultWidth} × ${previewResultHeight}`
                    : `${selected?.width} × ${selected?.height}`} PX
                </span>
              </div>
              <div
                className="crop-stage"
                onDoubleClick={() => void openTheater()}
                title={t.previewHelp}
              >
                {selected && previewView === 'source' && (
                  <ReactCrop
                    crop={currentCrop}
                    aspect={activeAspect}
                    minWidth={24}
                    onChange={(_, percentCrop) => setCrops((current) => ({ ...current, [selected.id]: percentCrop }))}
                    keepSelection
                    style={{ touchAction: 'none' }}
                  >
                    <img
                      src={selected.sourceUrl}
                      alt={selected.file.name}
                      draggable={false}
                      style={{ touchAction: 'none' }}
                    />
                  </ReactCrop>
                )}
                {selected && previewResultUrl && previewView === 'result' && (
                  <img className="result-preview" src={previewResultUrl} alt={`${selected.file.name} ${t.result}`} />
                )}
                <span className="preview-hint">↗ {t.previewHelp}</span>
              </div>
              <div className="crop-help">
                <span>{previewView === 'source' ? '↗' : '✓'}</span>
                {previewView === 'source' || !previewResultSize
                  ? t.cropHelp
                  : `${t.before} ${formatBytes(selected!.file.size)} · ${t.after} ${formatBytes(previewResultSize)}`}
              </div>
            </div>

            <aside className="settings-panel panel">
              <div className="panel-heading">
                <strong>{t.settings}</strong>
                <span className="step-count">01—04</span>
              </div>

              <div className="control-section crop-control">
                <label className="control-label"><b>01</b>{t.cropRatio}</label>
                <div className="ratio-grid">
                  {standardRatioPresets.map((preset) => (
                    <button
                      key={preset.key}
                      className={ratioKey === preset.key ? 'active' : ''}
                      onClick={() => updateRatio(preset.key)}
                    >
                      {preset.key === 'original' ? t.original : preset.key === 'custom' ? t.custom : preset.label}
                    </button>
                  ))}
                </div>
                <div className="photo-preset-heading"><span>{t.cinemaRatios}</span><i /></div>
                <div className="photo-ratio-grid cinema-ratio-grid">
                  {cinemaRatioPresets.map((preset) => (
                    <button
                      key={preset.key}
                      className={ratioKey === preset.key ? 'active' : ''}
                      onClick={() => updateRatio(preset.key)}
                    >
                      <span>{preset.label}</span>
                      <small>{language === 'zh' ? preset.noteZh : preset.noteEn}</small>
                    </button>
                  ))}
                </div>
                <div className="photo-preset-heading"><span>{t.photoRatios}</span><i /></div>
                <div className="photo-ratio-grid">
                  {chinaPhotoPresets.map((preset) => (
                    <button
                      key={preset.key}
                      className={ratioKey === preset.key ? 'active' : ''}
                      onClick={() => updateRatio(preset.key)}
                    >
                      <span>{language === 'zh' ? preset.labelZh : preset.labelEn}</span>
                      <small>{preset.size}</small>
                    </button>
                  ))}
                </div>
                <p className="hint">{t.photoRatioHint}</p>
                {ratioKey === 'custom' && (
                  <div className="custom-ratio">
                    <input aria-label={`${t.customRatio} ${t.width}`} type="number" min="1" value={customRatio.width} onChange={(event) => updateCustomRatio('width', Number(event.target.value))} />
                    <span>:</span>
                    <input aria-label={`${t.customRatio} ${t.height}`} type="number" min="1" value={customRatio.height} onChange={(event) => updateCustomRatio('height', Number(event.target.value))} />
                  </div>
                )}
              </div>

              <div className="control-section resize-control">
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

              <div className="control-section format-control">
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
                {selected && (
                  <div className="live-comparison" aria-label={t.liveComparison}>
                    <div>
                      <small>{t.source}</small>
                      <strong>{formatBytes(selected.file.size)}</strong>
                      <span>{selected.width} × {selected.height} px</span>
                    </div>
                    <b aria-hidden="true">→</b>
                    <div>
                      <small>{t.estimated}</small>
                      <strong>{estimating ? t.estimating : previewResultSize ? formatBytes(previewResultSize) : '—'}</strong>
                      <span>{previewResultWidth && previewResultHeight ? `${previewResultWidth} × ${previewResultHeight} px` : '—'}</span>
                    </div>
                    {!estimating && estimatedSavings !== undefined && (
                      <em className={estimatedSavings >= 0 ? 'positive' : 'negative'}>
                        {estimatedSavings >= 0 ? '−' : '+'}{Math.abs(estimatedSavings)}% {t.saved}
                      </em>
                    )}
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

      {theaterMode && selected && (
        <div
          className="theater-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.previewHelp}
          onDoubleClick={closeTheater}
        >
          <button className="theater-close" aria-label={t.theaterHelp} onClick={closeTheater}>×</button>
          <div className="theater-frame">
            {theaterPreviewUrl && (
              <img src={theaterPreviewUrl} alt={selected.file.name} draggable={false} />
            )}
            {theaterLoading && <div className="theater-loading"><i /><span>{t.theaterLoading}</span></div>}
            <p>{t.theaterHelp}</p>
          </div>
        </div>
      )}

      <footer>
        <span>PicSizeKit / 2026</span>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}
