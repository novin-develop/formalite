import castPath from "./castPath";
import toKey from "./toKey";

function baseGet(object, path) {
  // eslint-disable-next-line no-param-reassign
  path = castPath(path, object);

  let index = 0;
  const { length } = path;

  while (object != null && index < length) {
    // eslint-disable-next-line no-param-reassign,no-plusplus
    object = object[toKey(path[index++])];
  }
  // eslint-disable-next-line eqeqeq
  return index && index == length ? object : undefined;
}

export default baseGet;
