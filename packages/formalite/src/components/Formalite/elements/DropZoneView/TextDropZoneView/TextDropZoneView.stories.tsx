import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestTextDropZoneView } from "./TestTextDropZoneView";
import { TextDropZoneViewCode } from "./TextDropZoneView.code";

export default {
  title: "Components/DropZoneView",
  component: TestTextDropZoneView,
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
} as ComponentMeta<typeof TestTextDropZoneView>;

const Template: ComponentStory<typeof TestTextDropZoneView> = (
  args,
  { globals }
) => {
  return <TestTextDropZoneView {...args} lang={globals?.locale || "en"} />;
};

export const TextDropZoneView = Template.bind({});
TextDropZoneView.args = {
  withIni: true,
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "aaa",
    dropZoneOptions: {
      maxSize: 3145728,
    },
    helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif`,
  },
  showPreview: false,
  imageDownloader: dropzoneImageDownloader,
  onUpload: (file, progress) =>
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        progress(50);
      }, 1000);
      setTimeout(() => {
        // resolve(new Date().getTime().toString());
        reject(new Error("aaaa"));
      }, 2000);
    }),
  onDelete: (id, isFromDefault) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }),
};
TextDropZoneView.storyName = "Text dropzone";
TextDropZoneView.parameters = {
  docs: {
    source: {
      code: TextDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
