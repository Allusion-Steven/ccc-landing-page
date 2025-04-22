// place files you want to import through the `$lib` alias in this folder.

export const environment = process.env.NODE_ENV;
export const isLive = (environment === "production") ? true : false

// export const baseUrl = isLive ? "https://macroexotics.com" : "http://localhost:5173"
export const baseUrl = import.meta.env.DEV
  ? 'http://localhost:5173'
  : 'https://macroexotics.com';

export const apiUrl = isLive
  ? 'https://my.macroexotics.com/api'
  : 'http://localhost:5174/api';

export const dashboardUrl = isLive
  ? 'https://my.macroexotics.com'
  : 'http://localhost:5174';
