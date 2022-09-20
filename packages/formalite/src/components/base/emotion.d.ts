import { light } from "@config/theme";
import "@emotion/react";

type MyTheme = typeof light;

declare module "@emotion/react" {
  export interface Theme extends MyTheme {}
}
