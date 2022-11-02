import isSymbol from "./isSymbol";

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

function toKey(value) {
  if (typeof value === "string" || isSymbol(value)) {
    return value;
  }
  const result = `${value}`;
  // eslint-disable-next-line eqeqeq
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

export default toKey;
