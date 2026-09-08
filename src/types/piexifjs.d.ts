declare module 'piexifjs' {
  type ExifData = Record<string, Record<string, unknown>>;

  const piexif: {
    ImageIFD: { Orientation: number };
    load(data: string): ExifData;
    dump(data: ExifData): string;
    insert(exif: string, jpeg: string): string;
  };

  export default piexif;
}
