import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestTimePickerView } from "./TestTimePickerView";
import { TimePickerViewCode } from "./TimePickerView.code";

export default {
  title: "Components/DatePickerView",
  component: TestTimePickerView,
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
} as ComponentMeta<typeof TestTimePickerView>;

const Template: ComponentStory<typeof TestTimePickerView> = (
  args,
  { globals: { locale } }
) => {
  return <TestTimePickerView {...args} lang={locale} />;
};

export const TimePicker = Template.bind({});
TimePicker.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Time Picker",
    helperText: "helper text",
  },
  // datePickerProps: {
  //   mask: "____/__/__",
  // },
  onChange: (date) =>
    console.log("test time Picker onChage", date),
};
TimePicker.storyName = "Time picker";
TimePicker.parameters = {
  docs: {
    source: {
      code: TimePickerViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
