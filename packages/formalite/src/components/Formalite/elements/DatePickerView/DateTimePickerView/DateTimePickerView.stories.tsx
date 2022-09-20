import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestDateTimePickerView } from "./TestDateTimePickerView";
import { DateTimePickerViewCode } from "./DateTimePickerView.code";

export default {
  title: "Components/DatePickerView",
  component: TestDateTimePickerView,
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
} as ComponentMeta<typeof TestDateTimePickerView>;

const Template: ComponentStory<typeof TestDateTimePickerView> = (
  args,
  { globals: { locale } }
) => {
  return <TestDateTimePickerView {...args} lang={locale} />;
};

export const DateTimePicker = Template.bind({});
DateTimePicker.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Date Time Picker",
    helperText: "helper text",
  },
  // datePickerProps: {
  //   mask: "____/__/__",
  // },
  onChange: (date) =>
    console.log("test date time Picker onChage", date),
};
DateTimePicker.storyName = "Date Time picker";
DateTimePicker.parameters = {
  docs: {
    source: {
      code: DateTimePickerViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
