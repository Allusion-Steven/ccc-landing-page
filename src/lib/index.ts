// place files you want to import through the `$lib` alias in this folder.

export const environment = process.env.NODE_ENV;
export const isLive = (environment === "production") ? true : false