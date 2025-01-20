import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dilasxrts',
  api_key: '472121866969719',
  api_secret: 'nDgzwKWMT5tb7UbwfdSjITG_3Uw'
});

const CLOUD_NAME = 'dilasxrts';

export function buildImageUrl(publicId: string, options: Record<string, any> = {}) {
  // const defaultOptions = {
  //   quality: 'auto',
  //   fetch_format: 'auto'
  // };

  // const allOptions = { ...defaultOptions, ...options };

  // const transformations = Object.entries(allOptions)
  //   .map(([key, value]) => `${key}_${value}`)
  //   .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
} 