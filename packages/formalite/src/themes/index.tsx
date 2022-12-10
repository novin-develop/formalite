import React, { ReactNode } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { Direction, Theme } from "@components/base/model";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  themeMode: Theme;
  themeDirection: Direction;
};

export default function ThemeProvider({
  children,
  themeMode,
  themeDirection,
}: Props) {
  const isLight = themeMode === "light";
  const isRtl = themeDirection === "rtl";

  const theme = createTheme({
    palette: {
      mode: isLight ? "light" : "dark",
    },
    direction: themeDirection,
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
