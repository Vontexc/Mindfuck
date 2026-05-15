// Tiny dev logger — silent in production builds.

const isDev = (() => {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
})();

export const logger = {
  info: (...args: unknown[]): void => {
    if (isDev) console.info('[SN]', ...args);
  },
  warn: (...args: unknown[]): void => {
    if (isDev) console.warn('[SN]', ...args);
  },
  error: (...args: unknown[]): void => {
    console.error('[SN]', ...args);
  },
};
