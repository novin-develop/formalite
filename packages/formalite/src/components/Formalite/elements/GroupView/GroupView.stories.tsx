import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ViewTypes } from "@components/Formalite/Formalite.type";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestGroupView } from "./TestGroupView";
import { GroupViewCode } from "./GroupView.code";

export default {
  title: "Components/GroupView",
  component: TestGroupView,
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
} as ComponentMeta<typeof TestGroupView>;

const Template: ComponentStory<typeof TestGroupView> = (
  args,
  { globals: { locale } }
) => {
  return <TestGroupView {...args} lang={locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    xs: 12,
    sm: 8,
  },
  options: {
    name: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 6,
      },
      inputProps: {
        label: "Grouped Name",
      },
    },
    family: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 6,
      },
      inputProps: {
        label: "Grouped Family",
      },
    },
    address: {
      type: ViewTypes.TextView,
      layoutProps: {
        xs: 12,
      },
      inputProps: {
        label: "Grouped Address",
      },
    },
  },
};
Base.storyName = "base";
Base.parameters = {
  docs: {
    source: {
      code: GroupViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
