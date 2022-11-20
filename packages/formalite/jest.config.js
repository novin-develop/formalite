/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/components/Formalite/elements/**/*.{js,jsx,ts,tsx}",
    "src/components/Formalite/config/**/*.{js,jsx,ts,tsx}",
    "src/components/Formalite/components/**/*.{js,jsx,ts,tsx}",
    "src/components/Formalite/Formalite.tsx",
    "!src/components/Formalite/elements/**/Test*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/*.stories.{ts,tsx}",
    "!**/*.code.{ts,tsx}",
  ],

  modulePaths: ["."], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    ...pathsToModuleNameMapper({
      "@components/*": ["src/components/*"],
      "@config/*": ["src/config/*"],
      "@themes/*": ["src/themes/*"],
    }),
    "^lodash-es$": "lodash",
  },
  transform: {
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
      },
    ],
    "\\.svg$": "<rootDir>/jest-svg-transformer.js",
  },
};
