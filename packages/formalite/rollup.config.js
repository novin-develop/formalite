import path from "path";
// eslint-disable-next-line import/no-unresolved
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import { exec } from "child_process";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import visualizer from "rollup-plugin-visualizer";
import svgr from "@svgr/rollup";
import dts from "rollup-plugin-dts";
import image from "@rollup/plugin-image";

const onwarn = (warning, rollupWarn) => {
  const ignoredWarnings = [
    {
      ignoredCode: "CIRCULAR_DEPENDENCY",
      ignoredPath: "src/components/Formalite/Formalite.tsx",
    },
  ];

  // only show warning when code and path don't match
  // anything in above list of ignored warnings
  if (
    !ignoredWarnings.some(
      ({ ignoredCode, ignoredPath }) =>
        warning.code === ignoredCode &&
        path.resolve(warning.importer).includes(path.resolve(ignoredPath))
    )
  ) {
    rollupWarn(warning);
  }
};

const excludePathsFromExternal = ["@components", "@config"];

const isExternal = (id) => {
  return (
    !id.startsWith(".") &&
    !path.isAbsolute(id) &&
    !excludePathsFromExternal.some((p) => id.startsWith(p))
  );
};

const tscAlias = () => {
  return {
    name: "tsAlias",
    writeBundle: () => {
      return new Promise((res, rej) => {
        exec(
          "tsc-alias -p tsconfig.build.json",
          function callback(error, stdout, stderr) {
            if (stderr || error) {
              rej(stderr || error);
            } else {
              res(stdout);
            }
          }
        );
      });
    },
  };
};

const sharedConfig = {
  onwarn,
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      useTsconfigDeclarationDir: true,
    }),
    svgr({ exportType: "named" }),
    tscAlias(),
    visualizer({
      filename: "bundle-analysis.html",
    }),
    image(),
  ],
  external: isExternal,
};

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "./dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
    },
    ...{
      ...sharedConfig,
      plugins: [...sharedConfig.plugins, optimizeLodashImports()],
    },
  },
  {
    input: "src/index.ts",
    output: {
      dir: "./dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    ...{
      ...sharedConfig,
      plugins: [
        ...sharedConfig.plugins,
        optimizeLodashImports({ useLodashEs: true }),
      ],
    },
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
