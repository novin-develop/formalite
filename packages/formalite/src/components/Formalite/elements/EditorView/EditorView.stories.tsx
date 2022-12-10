import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestEditorView } from "./TestEditorView";
import { EditorViewCode } from "./EditorView.code";

export default {
  title: "Components/EditorView",
  component: TestEditorView,
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
} as ComponentMeta<typeof TestEditorView>;

const Template: ComponentStory<typeof TestEditorView> = (args, { globals }) => {
  return <TestEditorView {...args} lang={globals?.locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    xs: 12,
  },
  editorProps: {
    isToolbarSimple: false,
    label: "Editor",
    helperText: "helper text",
    placeholder: "Placeholder...",
  },
};
Base.storyName = "Base";
Base.parameters = {
  docs: {
    source: {
      code: EditorViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
