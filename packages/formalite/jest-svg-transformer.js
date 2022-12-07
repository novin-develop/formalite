const path = require("path");

module.exports = {
  process(src, filePath) {
    if (path.extname(filePath) !== ".svg") {
      return src;
    }

    const name = `svg-${path.basename(filePath, ".svg")}`
      .split(/\W+/)
      .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
      .join("");

    return {
      code: `${name}`,
    };
  },
};
