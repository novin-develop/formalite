import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FetchingDataEnum } from "@components/base/model";
import { PaddingContainer } from "@components/base/PaddingContainer";
import { TestSimpleAutoCompleteView } from "./TestSimpleAutoCompleteView";
import {
  SimpleAutoCompleteViewCode,
  FreeSoloAutoCompleteViewCode,
} from "./SimpleAutoCompleteView.code";

export default {
  title: "Components/AutocompleteView",
  component: TestSimpleAutoCompleteView,
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
} as ComponentMeta<typeof TestSimpleAutoCompleteView>;

const Template: ComponentStory<typeof TestSimpleAutoCompleteView> = (
  args,
  { globals: { locale } }
) => {
  return <TestSimpleAutoCompleteView {...args} lang={locale} />;
};

export const SimpleAutoCompleteView = Template.bind({});
SimpleAutoCompleteView.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title of Simple view",
    helperText: "Helper text",
  },
  autoCompleteProps: {
    freeSolo: false,
    multiple: false,
    onChange: (value) => {
      console.log(value);
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
SimpleAutoCompleteView.storyName = "Simple mode";
SimpleAutoCompleteView.parameters = {
  docs: {
    source: {
      code: SimpleAutoCompleteViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};

export const FreeSoloAutoCompleteView = Template.bind({});
FreeSoloAutoCompleteView.args = {
  layoutProps: {
    md: 6,
    xs: 12,
  },
  inputProps: {
    label: "Title of Free Solo view",
    helperText: "Helper text",
  },
  autoCompleteProps: {
    freeSolo: true,
    multiple: false,
    onChange: (value) => {
      console.log(value);
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
FreeSoloAutoCompleteView.storyName = "Free Solo mode";
FreeSoloAutoCompleteView.parameters = {
  docs: {
    source: {
      code: FreeSoloAutoCompleteViewCode,
      language: "javascript",
      type: "auto",
    },
  },
};
