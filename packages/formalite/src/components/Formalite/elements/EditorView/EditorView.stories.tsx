import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { OnUploadPromise } from "@components/Formalite/elements/EditorView/EditorView.type";
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

const Template: ComponentStory<typeof TestEditorView> = (
  args,
  { globals: { locale } }
) => {
  return <TestEditorView {...args} lang={locale} />;
};

export const Base = Template.bind({});
Base.args = {
  layoutProps: {
    xs: 12,
  },
  editorProps: {
    label: "Editor",
    helperText: "helper text",
    placeholder: "Placeholder...",
  },
  onUpload: (file) =>
    new Promise<OnUploadPromise>((resolve, reject) => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve({
            alt: "image",
            href: "image",
            url: String(reader.result),
          });
        };
      }, 1000);
    }),
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
