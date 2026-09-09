import { useEffect, useRef } from 'react';
import ReactCrop, { type ReactCropProps, type PixelCrop } from 'react-image-crop';

type Point = { x: number; y: number };
type Gesture = {
  crop: PixelCrop;
  points: Point[];
  corner?: string;
  width: number;
  height: number;
};
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const midpoint = (points: Point[]) => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
const distance = (points: Point[]) => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);

/** Native non-passive touch listeners keep iOS crop gestures separate from page gestures.
 * Mouse, pen and keyboard interactions remain with ReactCrop.
 */
export default function TouchCrop(props: ReactCropProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  latest.current = props;

  useEffect(() => {
    const host = hostRef.current!;
    let gesture: Gesture | undefined;
    const pointsFor = (event: TouchEvent) => Array.from(event.touches).filter((touch) => touch.target instanceof Node && host.contains(touch.target)).slice(0, 2).map((touch) => ({ x: touch.clientX, y: touch.clientY }));

    const begin = (event: TouchEvent) => {
      const { crop, disabled } = latest.current;
      const image = host.querySelector('img');
      if (!crop || disabled || !image) return;
      const box = image.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const points = pointsFor(event);
      if (!points.length) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!gesture && !target?.closest('.ReactCrop__crop-selection') && points.length < 2) return;
      if (event.cancelable) event.preventDefault();
      const pixelCrop: PixelCrop = crop.unit === '%'
        ? { unit: 'px', x: crop.x * box.width / 100, y: crop.y * box.height / 100, width: crop.width * box.width / 100, height: crop.height * box.height / 100 }
        : { ...crop, unit: 'px' };
      gesture = {
        crop: pixelCrop, points, width: box.width, height: box.height,
        corner: points.length === 1 ? target?.closest<HTMLElement>('[data-ord]')?.dataset.ord : undefined,
      };
    };

    const move = (event: TouchEvent) => {
      if (!gesture || latest.current.disabled) return;
      if (event.cancelable) event.preventDefault();
      const points = pointsFor(event);
      if (!points.length) return;
      if (points.length !== gesture.points.length) { begin(event); return; }
      const { crop, width: boundsWidth, height: boundsHeight, corner, points: start } = gesture;
      const next = { ...crop };
      const aspect = crop.width / crop.height;
      const minWidth = Math.min(boundsWidth, boundsHeight * aspect, Math.max(24, 24 * aspect));
      if (points.length === 2) {
        const scale = distance(points) / Math.max(1, distance(start));
        next.width = clamp(crop.width * scale, minWidth, Math.min(boundsWidth, boundsHeight * aspect));
        next.height = next.width / aspect;
        const from = midpoint(start);
        const to = midpoint(points);
        next.x = crop.x + (crop.width - next.width) / 2 + to.x - from.x;
        next.y = crop.y + (crop.height - next.height) / 2 + to.y - from.y;
      } else if (corner) {
        const east = corner.includes('e');
        const south = corner.includes('s');
        const anchorX = east ? crop.x : crop.x + crop.width;
        const anchorY = south ? crop.y : crop.y + crop.height;
        const dx = (points[0].x - start[0].x) * (east ? 1 : -1);
        const dy = (points[0].y - start[0].y) * (south ? 1 : -1);
        const deltaWidth = (dx + dy / aspect) / (1 + 1 / aspect ** 2);
        const maxWidth = Math.min(east ? boundsWidth - anchorX : anchorX, (south ? boundsHeight - anchorY : anchorY) * aspect);
        next.width = clamp(crop.width + deltaWidth, Math.min(minWidth, maxWidth), maxWidth);
        next.height = next.width / aspect;
        next.x = east ? anchorX : anchorX - next.width;
        next.y = south ? anchorY : anchorY - next.height;
      } else {
        next.x += points[0].x - start[0].x;
        next.y += points[0].y - start[0].y;
      }
      next.x = clamp(next.x, 0, boundsWidth - next.width);
      next.y = clamp(next.y, 0, boundsHeight - next.height);
      latest.current.onChange(next, { unit: '%', x: next.x / boundsWidth * 100, y: next.y / boundsHeight * 100, width: next.width / boundsWidth * 100, height: next.height / boundsHeight * 100 });
    };

    const end = (event: TouchEvent) => {
      if (!gesture) return;
      if (event.cancelable) event.preventDefault();
      gesture = undefined;
      if (event.type !== 'touchcancel' && pointsFor(event).length) {
        begin(event);
        // After a pinch, the remaining finger moves the crop instead of grabbing a corner.
        if (gesture) (gesture as Gesture).corner = undefined;
      }
    };
    const options = { passive: false };
    host.addEventListener('touchstart', begin, options);
    host.addEventListener('touchmove', move, options);
    host.addEventListener('touchend', end, options);
    host.addEventListener('touchcancel', end, options);
    return () => {
      host.removeEventListener('touchstart', begin);
      host.removeEventListener('touchmove', move);
      host.removeEventListener('touchend', end);
      host.removeEventListener('touchcancel', end);
    };
  }, []);

  return <div ref={hostRef} className="touch-crop" onPointerDownCapture={(event) => {
    // Avoid running both the library's pointer drag and the native touch gesture.
    if (event.pointerType === 'touch') event.stopPropagation();
  }}><ReactCrop {...props} /></div>;
}
