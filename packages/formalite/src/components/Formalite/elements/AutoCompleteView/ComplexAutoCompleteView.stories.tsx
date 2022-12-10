import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestComplexAutoCompleteView } from "./TestComplexAutoCompleteView";
import {
  ComplexAutoCompleteViewCode,
  MultipleAutoCompleteViewCode,
} from "./ComplexAutoCompleteView.code";

export default {
  title: "Components/AutocompleteView",
  component: TestComplexAutoCompleteView,
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
} as ComponentMeta<typeof TestComplexAutoCompleteView>;

const Template: ComponentStory<typeof TestComplexAutoCompleteView> = (
  args,
  { globals }
) => {
  return <TestComplexAutoCompleteView {...args} lang={globals?.locale} />;
};

export const MultipleAutoCompleteView = Template.bind({});
MultipleAutoCompleteView.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title of Multiple view",
    helperText: "Helper text",
  },
  autoCompleteProps: {
    freeSolo: false,
    multiple: true,
    onChange: (value) => {
      // console.log(value);
    },
  },
  dataFetching: {
    type: FetchingDataEnum.MANUAL,
    loading: false,
    error: false,
    onRetry: () => {
      console.log("fg forever");
    },
    data: {
      one: {
        label: "one",
      },
      two: {
        label: "two",
      },
    },
  },
};
MultipleAutoCompleteView.storyName = "Multiple mode";
MultipleAutoCompleteView.parameters = {
  docs: {
    source: {
      code: MultipleAutoCompleteViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};

export const ComplexAutoCompleteView = Template.bind({});
ComplexAutoCompleteView.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title of Complex view",
    helperText: "Helper text",
  },
  autoCompleteProps: {
    freeSolo: true,
    multiple: true,
    onChange: (value) => {
      // console.log(value);
    },
  },
  dataFetching: {
    type: FetchingDataEnum.MANUAL,
    loading: false,
    error: false,
    onRetry: () => {
      console.log("fg forever");
    },
    data: {
      one: {
        label: "one",
      },
      two: {
        label: "two",
      },
    },
  },
};
ComplexAutoCompleteView.storyName = "Complex mode";
ComplexAutoCompleteView.parameters = {
  docs: {
    source: {
      code: ComplexAutoCompleteViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
