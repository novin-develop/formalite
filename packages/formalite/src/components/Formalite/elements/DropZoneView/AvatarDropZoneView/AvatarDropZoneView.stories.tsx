import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestAvatarDropZoneView } from "./TestAvatarDropZoneView";
import { AvatarDropZoneViewCode } from "./AvatarDropZoneView.code";

export default {
  title: "Components/DropZoneView",
  component: TestAvatarDropZoneView,
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
} as ComponentMeta<typeof TestAvatarDropZoneView>;

const Template: ComponentStory<typeof TestAvatarDropZoneView> = (
  args,
  { globals }
) => {
  return <TestAvatarDropZoneView {...args} lang={globals?.locale} />;
};

export const AvatarDropZoneView = Template.bind({});
AvatarDropZoneView.args = {
  layoutProps: {
    md: 12,
    xs: 12,
  },
  inputProps: {
    label: "aaa",
    dropZoneOptions: {
      maxSize: 3145728,
    },
    helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif `,
  },
  imageDownloader: dropzoneImageDownloader,
  onUpload: (file, progress) =>
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        progress(35);
      }, 500);
      setTimeout(() => {
        progress(70);
      }, 1000);
      setTimeout(() => {
        progress(100);
      }, 1500);
      setTimeout(() => {
        resolve(new Date().getTime().toString());
        // reject(new Error("aaaa"));
      }, 1700);
    }),
  onDelete: (id, isFromDefault) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }),
};
AvatarDropZoneView.storyName = "Avatar dropzone";
AvatarDropZoneView.parameters = {
  docs: {
    source: {
      code: AvatarDropZoneViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
