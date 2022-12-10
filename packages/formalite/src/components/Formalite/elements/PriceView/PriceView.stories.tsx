import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestPriceView } from "./TestPriceView";
import { PriceViewCode } from "./PriceView.code";

export default {
  title: "Components/PriceView",
  component: TestPriceView,
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
} as ComponentMeta<typeof TestPriceView>;

const Template: ComponentStory<typeof TestPriceView> = (args, { globals }) => {
  return <TestPriceView {...args} lang={globals?.locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Price",
    onChange: (value) => {
      // console.log(value);
    },
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: PriceViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
