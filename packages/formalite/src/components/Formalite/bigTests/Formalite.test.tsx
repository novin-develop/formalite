import { act } from "react-dom/test-utils";
import React from "react";
import { ComponentStory } from "@storybook/react";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import { TestFormalite } from "./TestFormalite";

const Template: ComponentStory<typeof TestFormalite> = (args, { globals }) => {
  return <TestFormalite {...args} lang={globals?.locale || "en"} />;
};

const AllBase = Template.bind({});

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(100);
  });
});

test("Formalite: All Loading", async () => {
  let allSkeleton: HTMLCollectionOf<Element>;
  await waitFor(async () => {
    const { container } = render(<AllBase themeMode="light" loading />);

    allSkeleton = container.getElementsByClassName("MuiSkeleton-root");
  });

  await waitFor(async () => {
    expect(allSkeleton).toHaveLength(49);
  });
});
