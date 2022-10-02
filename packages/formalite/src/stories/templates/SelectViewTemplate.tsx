import { ComponentStory } from "@storybook/react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDarkMode } from "storybook-dark-mode";
import { TestSelectView } from "@components/Formalite/elements/SelectView/TestSelectView";
import { SelectViewType } from "@components/Formalite/elements/SelectView/SelectView.type";

const SelectViewTemplate: ComponentStory<typeof TestSelectView> = (
  args: Omit<SelectViewType & { theme?: any }, "type">,
  { globals: { locale } }
) => {
  const { theme, ...allArgs } = args;
  const isDarkMode = useDarkMode();

  if (theme) {
    return (
      <ThemeProvider
        theme={createTheme({
          ...theme,
          palette: {
            ...theme.palette,
            mode: isDarkMode ? "dark" : "light",
          },
        })}
      >
        <TestSelectView {...allArgs} lang={locale} />
      </ThemeProvider>
    );
  }
  return <TestSelectView {...allArgs} lang={locale} />;
};

export default SelectViewTemplate;
