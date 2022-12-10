import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestComponentView } from "./TestComponentView";
import { ComponentViewCode } from "./ComponentView.code";

export default {
  title: "Components/ComponentView",
  component: TestComponentView,
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
} as ComponentMeta<typeof TestComponentView>;

const Template: ComponentStory<typeof TestComponentView> = (
  args,
  { globals }
) => {
  return <TestComponentView {...args} lang={globals?.locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  render: (name, value, onChange, error, isTouched) => (
    <div style={{ border: "1px solid", padding: "8px" }}>
      Can Render any component
    </div>
  ),
};
Base.parameters = {
  docs: {
    source: {
      code: ComponentViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
