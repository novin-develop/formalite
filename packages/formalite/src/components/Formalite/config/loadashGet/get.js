import baseGet from "./baseGet";

function get(object, path, defaultValue) {
  const result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

export default get;
