import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestCheckGroupView } from "./TestCheckGroupView";
import { CheckGroupViewCode } from "./CheckGroupView.code";

export default {
  title: "Components/CheckGroupView",
  component: TestCheckGroupView,
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
} as ComponentMeta<typeof TestCheckGroupView>;

const Template: ComponentStory<typeof TestCheckGroupView> = (
  args,
  { globals: { locale } }
) => {
  return <TestCheckGroupView {...args} lang={locale} />;
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
  inputProps: {
    label: "Title",
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
};
Base.parameters = {
  docs: {
    source: {
      code: CheckGroupViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
