import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestDatePickerView } from "./TestDatePickerView";
import { DatePickerViewCode } from "./DatePickerView.code";

export default {
  title: "Components/DatePickerView",
  component: TestDatePickerView,
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
} as ComponentMeta<typeof TestDatePickerView>;

const Template: ComponentStory<typeof TestDatePickerView> = (
  args,
  { globals }
) => {
  return <TestDatePickerView {...args} lang={globals?.locale} />;
};

export const DatePicker = Template.bind({});
DatePicker.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Date Picker",
    helperText: "helper text",
  },
  // datePickerProps: {
  //   mask: "____/__/__",
  // },
  onChange: (date) => {
    // console.log("test datePicker onChage", date)
  },
};
DatePicker.storyName = "Date picker";
DatePicker.parameters = {
  docs: {
    source: {
      code: DatePickerViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
