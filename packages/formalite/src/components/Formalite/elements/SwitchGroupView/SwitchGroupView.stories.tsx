import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestSwitchGroupView } from "./TestSwitchGroupView";
import { SwitchGroupViewCode } from "./SwitchGroupView.code";

export default {
  title: "Components/SwitchGroupView",
  component: TestSwitchGroupView,
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
} as ComponentMeta<typeof TestSwitchGroupView>;

const Template: ComponentStory<typeof TestSwitchGroupView> = (
  args,
  { globals }
) => {
  return <TestSwitchGroupView {...args} lang={globals?.locale || "en"} />;
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
    label: "CheckGroupView",
    helperText: "HelperText",
    onChange: (value, additionalData) => {
      console.log(value, additionalData);
    },
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: SwitchGroupViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
