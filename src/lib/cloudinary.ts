const CLOUD_NAME = 'dilasxrts';

interface ImageOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  fetch_format?: string;
}

export function buildImageUrl(publicId: string, options: ImageOptions = {}) {
  const transformations = Object.entries(options)
    .map(([key, value]) => `${key[0]}_${value}`)
    .join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations ? transformations + '/' : ''}${publicId}`;
}