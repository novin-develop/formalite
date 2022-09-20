import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";

import { Theme } from "@components/base/model";
import { TestFormalite } from "./TestFormalite";

export default {
  title: "Components",
  component: TestFormalite,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    themeMode: {
      table: {
        disable: true,
      },
    },
    lang: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TestFormalite>;

const Template: ComponentStory<typeof TestFormalite> = (
  args,
  { globals: { locale } }
) => {
  const themeMode: Theme = useDarkMode() ? "dark" : "light";
  return (
    <TestFormalite themeMode={themeMode || args.themeMode} lang={locale} />
  );
};

export const Test = Template.bind({});
Test.args = {};
Test.storyName = "Playground";
