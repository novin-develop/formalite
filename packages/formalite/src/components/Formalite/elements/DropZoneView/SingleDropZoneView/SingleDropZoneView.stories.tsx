import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestSingleDropZoneView } from "./TestSingleDropZoneView";
import {
  SingleDropZoneViewCode,
  SmallSingleDropZoneViewCode,
} from "./SingleDropZoneView.code";

export default {
  title: "Components/DropZoneView",
  component: TestSingleDropZoneView,
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
} as ComponentMeta<typeof TestSingleDropZoneView>;

const Template: ComponentStory<typeof TestSingleDropZoneView> = (
  args,
  { globals }
) => {
  return <TestSingleDropZoneView {...args} lang={globals?.locale} />;
};

export const SingleDropZoneView = Template.bind({});
SingleDropZoneView.args = {
  layoutProps: {
    md: 12,
    xs: 12,
  },
  inputProps: {
    label: "Single Drop Zone",
    dropZoneOptions: {
      maxSize: 3145728,
    },
    helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif `,
  },
  imageDownloader: dropzoneImageDownloader,
  onUpload: (file, progress) =>
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        progress(50);
      }, 1000);
      setTimeout(() => {
        resolve(new Date().getTime().toString());
        // reject(new Error("aaaa"));
      }, 2000);
    }),
  onDelete: (id, isFromDefault) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }),
};
SingleDropZoneView.storyName = "Single dropzone";
SingleDropZoneView.parameters = {
  docs: {
    source: {
      code: SingleDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};

export const SmallSingleDropZoneView = Template.bind({});
SmallSingleDropZoneView.args = {
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
SmallSingleDropZoneView.storyName = "Small Single dropzone";
SmallSingleDropZoneView.parameters = {
  docs: {
    source: {
      code: SmallSingleDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
