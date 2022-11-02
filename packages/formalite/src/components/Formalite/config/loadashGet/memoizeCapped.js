import memoize from "./memoize";

/** Used as the maximum memoize cache size. */
const MAX_MEMOIZE_SIZE = 500;

function memoizeCapped(func) {
  const result = memoize(func, (key) => {
    const { cache } = result;
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  return result;
}

export default memoizeCapped;
