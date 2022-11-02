import isKey from "./isKey";
import stringToPath from "./stringToPath";

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(value);
}

export default castPath;
