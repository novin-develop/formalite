import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestMultiDropZoneView } from "./TestMultiDropZoneView";
import {
  MultiDropZoneViewCode,
  SmallDropZoneViewCode,
} from "./MultiDropZoneView.code";

export default {
  title: "Components/DropZoneView",
  component: TestMultiDropZoneView,
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
} as ComponentMeta<typeof TestMultiDropZoneView>;

const Template: ComponentStory<typeof TestMultiDropZoneView> = (
  args,
  { globals: { locale } }
) => {
  return <TestMultiDropZoneView {...args} lang={locale} />;
};

export const MultiDropZoneView = Template.bind({});
MultiDropZoneView.args = {
  layoutProps: {
    md: 12,
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
  onUpload: (_file, progress) =>
    new Promise<string>((_resolve, reject) => {
      setTimeout(() => {
        progress(50);
      }, 1000);
      setTimeout(() => {
        // resolve(new Date().getTime().toString());
        reject(new Error("aaaa"));
      }, 2000);
    }),
  onDelete: (_id, _isFromDefault) =>
    new Promise<void>((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }),
};
MultiDropZoneView.storyName = "Multiple dropzone";
MultiDropZoneView.parameters = {
  docs: {
    source: {
      code: MultiDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};

export const SmallDropZoneView = Template.bind({});
SmallDropZoneView.args = {
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
  isSmallView: true,
  showPreview: false,
  imageDownloader: dropzoneImageDownloader,
  onUpload: (_file, progress) =>
    new Promise<string>((_resolve, reject) => {
      setTimeout(() => {
        progress(50);
      }, 1000);
      setTimeout(() => {
        // resolve(new Date().getTime().toString());
        reject(new Error("aaaa"));
      }, 1000);
    }),
  onDelete: (_id, _isFromDefault) =>
    new Promise<void>((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }),
};
SmallDropZoneView.storyName = "Small dropzone";
SmallDropZoneView.parameters = {
  docs: {
    source: {
      code: SmallDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
