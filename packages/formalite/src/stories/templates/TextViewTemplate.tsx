import { ComponentStory } from "@storybook/react";
import { TestTextView } from "@components/Formalite/elements/TextView/TestTextView";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDarkMode } from "storybook-dark-mode";
import { TextViewType } from "@components/Formalite/elements/TextView/TextView.type";

const TextViewTemplate: ComponentStory<typeof TestTextView> = (
  args: Omit<TextViewType & { theme?: any }, "type">,
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
        <TestTextView {...allArgs} lang={locale} />
      </ThemeProvider>
    );
  }
  return <TestTextView {...allArgs} lang={locale} />;
};

export default TextViewTemplate;
