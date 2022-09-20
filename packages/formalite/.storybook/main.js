const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {

    if (config.resolve.plugins && Array.isArray(config.resolve.plugins)) {
      config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin({})];
    }

    return config;
  }
}
