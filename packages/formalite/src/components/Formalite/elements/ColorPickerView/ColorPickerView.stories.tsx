import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestColorPickerView } from "./TestColorPickerView";
import { ColorPickerViewCode } from "./ColorPickerView.code";

export default {
  title: "Components/ColorPickerView",
  component: TestColorPickerView,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    lang: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <PaddingContainer>
          <Story />
        </PaddingContainer>
      );
    },
  ],
} as ComponentMeta<typeof TestColorPickerView>;

const Template: ComponentStory<typeof TestColorPickerView> = (
  args,
  { globals: { locale } }
) => {
  return <TestColorPickerView {...args} lang={locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Color",
    helperText: "helper text",
  },
};
Base.parameters = {
  docs: {
    source: {
      code: ColorPickerViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
