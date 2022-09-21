import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestTextView } from "./TestTextView";
import { PasswordTextViewCode, SimpleTextViewCode } from "./TextView.code";

export default {
  title: "Components/TextView",
  component: TestTextView,
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
} as ComponentMeta<typeof TestTextView>;

const Template: ComponentStory<typeof TestTextView> = (
  args,
  { globals: { locale } }
) => {
  return <TestTextView {...args} lang={locale} />;
};

export const Simple = Template.bind({});
Simple.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title Input",
    helperText: "Helper text",
    placeholder: "some other title",
    onChange: (value) => {
      console.log(value);
    },
  },
};
Simple.storyName = "Simple mode";
Simple.parameters = {
  docs: {
    source: {
      code: SimpleTextViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};

export const PasswordMode = Template.bind({});
PasswordMode.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title Input",
    type: "password",
    helperText: "Helper text",
    placeholder: "Password",
    onChange: (value) => {
      console.log(value);
    },
  },
};
PasswordMode.storyName = "Password mode";
PasswordMode.parameters = {
  docs: {
    source: {
      code: PasswordTextViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
