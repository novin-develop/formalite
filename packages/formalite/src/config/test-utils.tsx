import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import ThemeProvider from "../themes/index";
import { RTL } from "../components/base/RTL";

const AllTheProviders = ({ children }: { children: ReactElement }) => {
  return (
    <ThemeProvider themeMode="light" themeDirection="ltr">
      <RTL direction="ltr">{children}</RTL>
    </ThemeProvider>
  );
};

const customRender = (ui: any, options?: Object) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const createSelection = (
  field: HTMLInputElement,
  start: number,
  end: number
) => {
  if (field.setSelectionRange) {
    field.focus();
    field.setSelectionRange(start, end);
  }
};
