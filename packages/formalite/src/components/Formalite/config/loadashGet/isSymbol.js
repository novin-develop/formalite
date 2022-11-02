import getTag from "./getTag";

function isSymbol(value) {
  const type = typeof value;
  return (
    // eslint-disable-next-line eqeqeq
    type == "symbol" ||
    // eslint-disable-next-line eqeqeq
    (type === "object" && value != null && getTag(value) == "[object Symbol]")
  );
}

export default isSymbol;
