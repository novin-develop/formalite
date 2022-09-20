import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestRadioGroupView } from "./TestRadioGroupView";
import { RadioGroupViewCode } from "./RadioGroupView.code";

export default {
  title: "Components/RadioGroupView",
  component: TestRadioGroupView,
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
} as ComponentMeta<typeof TestRadioGroupView>;

const Template: ComponentStory<typeof TestRadioGroupView> = (
  args,
  { globals: { locale } }
) => {
  return <TestRadioGroupView {...args} lang={locale} />;
};

export const Base = Template.bind({});
Base.args = {
  labelProps: {
    // style: { color: "red" },
  },
  layoutProps: {
    md: 6,
    xs: 12,
  },
  dataFetching: {
    type: FetchingDataEnum.MANUAL,
    loading: false,
    error: false,
    onRetry: () => {
      console.log("fg forever");
    },
    data: {
      one: {
        label: "one",
        additionalData: {
          x: 1,
          y: 2,
        },
      },
      two: {
        label: "two",
      },
    },
  },
  inputProps: {
    label: "RadioGroupView",
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: RadioGroupViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
