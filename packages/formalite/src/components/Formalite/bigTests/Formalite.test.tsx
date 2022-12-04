import { act } from "react-dom/test-utils";
import React from "react";
import { ComponentStory } from "@storybook/react";
import { render, screen } from "@config/test-utils";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorTestFormalite } from "./ErrorTestFromalite";
import { TestFormalite } from "./TestFormalite";

const Template: ComponentStory<typeof TestFormalite> = (args, { globals }) => {
  return <TestFormalite {...args} lang={globals?.locale || "en"} />;
};

const AllBase = Template.bind({});

const TemplateError: ComponentStory<typeof ErrorTestFormalite> = (
  args,
  { globals }
) => {
  return <ErrorTestFormalite {...args} lang={globals?.locale || "en"} />;
};

const AllBaseError = TemplateError.bind({});

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(100);
  });
});

/// -------------------------Error
test("Formalite: All component must have error", async () => {
  render(<AllBaseError themeMode="light" />);

  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.click(submitButton);

  const avatarHelper = screen.getByText(/max size of 5000/i);
  await waitForElementToBeRemoved(avatarHelper);

  const allErrorTexts = screen.getAllByText(/Required/i);
  expect(allErrorTexts).toHaveLength(19);
});

test("Formalite: All Loading rendered", async () => {
  let allSkeleton: HTMLCollectionOf<Element>;

  await waitFor(async () => {
    const { container } = render(<AllBase themeMode="light" loading />);
    allSkeleton = container.getElementsByClassName("MuiSkeleton-root");
  });

  const RetryButton = screen.queryByRole("button", { name: "Retry" });

  await waitFor(async () => {
    expect(allSkeleton).toHaveLength(48);
    expect(RetryButton).toBeNull();
  });
});

test("Formalite: Dark Mode and rtl rendered", async () => {
  render(<AllBase themeMode="dark" direction="rtl" />);
  const allTextViews = screen.getAllByRole("textbox");

  await waitFor(async () => {
    expect(allTextViews).toHaveLength(12);
  });

  const RetryButton = screen.queryByRole("button", { name: "Retry" });

  await waitFor(async () => {
    expect(RetryButton).toBeNull();
  });
});
