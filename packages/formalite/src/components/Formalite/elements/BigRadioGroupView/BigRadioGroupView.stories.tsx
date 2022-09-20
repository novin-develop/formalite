import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme, FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestBigRadioGroupView } from "./TestBigRadioGroupView";
import { BigRadioGroupViewCode } from "./BigRadioGroupView.code";

export default {
  title: "Components/BigRadioGroupView",
  component: TestBigRadioGroupView,
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
} as ComponentMeta<typeof TestBigRadioGroupView>;

const Template: ComponentStory<typeof TestBigRadioGroupView> = (
  args,
  { globals: { locale } }
) => {
  return <TestBigRadioGroupView {...args} lang={locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    helperText: "HelperText",
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
        description: "This is desc",
        additionalData: {
          x: 1,
          y: 2,
        },
      },
      two: {
        label: "two",
        description: "that is desc",
      },
    },
  },
};
Base.parameters = {
  docs: {
    source: {
      code: BigRadioGroupViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
