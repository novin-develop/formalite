import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestSelectView } from "./TestSelectView";
import { SelectViewCode } from "./SelectView.code";

export default {
  title: "Components/SelectView",
  component: TestSelectView,
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
} as ComponentMeta<typeof TestSelectView>;

const Template: ComponentStory<typeof TestSelectView> = (args, { globals }) => {
  return <TestSelectView {...args} lang={globals?.locale || "en"} />;
};

export const Base = Template.bind({});
Base.args = {
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
    label: "Select Title",
    helperText: "HelperText",
    onChange: () => {
      throw new Error("This Error is OK");
    },
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: SelectViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
