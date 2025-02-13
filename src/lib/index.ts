// place files you want to import through the `$lib` alias in this folder.

export const environment = process.env.NODE_ENV;
export const isLive = (environment === "production") ? true : false

// export const baseUrl = isLive ? "https://macroexotics.com" : "http://localhost:5173"
export const baseUrl = import.meta.env.DEV
  ? 'http://10.0.0.9:5173'
  : 'https://ccc-landing-page-six.vercel.app';
