import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ViewTypes } from "@components/Formalite/Formalite.type";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestRepeaterView } from "./TestRepeaterView";
import { RepeaterViewCode } from "./RepeaterView.code";

export default {
  title: "Components/RepeaterView",
  component: TestRepeaterView,
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
} as ComponentMeta<typeof TestRepeaterView>;

const Template: ComponentStory<typeof TestRepeaterView> = (
  args,
  { globals }
) => {
  return <TestRepeaterView {...args} lang={globals?.locale || "en"} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    xs: 12,
  },
  buttonText: "Custom text",
  options: {
    name: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 6,
      },
      inputProps: {
        label: "Name",
      },
    },
    family: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 6,
      },
      inputProps: {
        label: "Family",
      },
    },
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: RepeaterViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
