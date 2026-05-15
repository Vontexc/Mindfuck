// Trailing-edge debouncer. Returns a function that batches calls within
// `waitMs` into a single trailing invocation.

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
): T & { flush: () => void; cancel: () => void } {
  let timer: number | null = null;
  let pending: Parameters<T> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    pending = args;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (pending) fn(...pending);
      pending = null;
    }, waitMs) as unknown as number;
  }) as T & { flush: () => void; cancel: () => void };

  debounced.flush = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    if (pending) fn(...pending);
    pending = null;
  };

  debounced.cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    pending = null;
  };

  return debounced;
}
