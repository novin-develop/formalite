import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestCardNumberView } from "./TestCardNumberView";
import { CardNumberViewCode } from "./CardNumberView.code";

export default {
  title: "Components/CardNumberView",
  component: TestCardNumberView,
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
} as ComponentMeta<typeof TestCardNumberView>;

const Template: ComponentStory<typeof TestCardNumberView> = (
  args,
  { globals }
) => {
  return <TestCardNumberView {...args} lang={globals?.locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  mask: "000 000",
  inputProps: {
    label: "CardNumber",
    onChange: (value) => {
      console.log(value);
    },
  },
};
Base.parameters = {
  docs: {
    source: {
      code: CardNumberViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
