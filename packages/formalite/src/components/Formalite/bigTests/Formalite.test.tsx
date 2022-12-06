import { act } from "react-dom/test-utils";
import React from "react";
import { ComponentStory } from "@storybook/react";
import { render, screen } from "@config/test-utils";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import { ErrorRepeaterFormalite } from "@components/Formalite/bigTests/ErrorRepeaterFormalite";
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

const TemplateRepeaterError: ComponentStory<typeof ErrorTestFormalite> = (
  args,
  { globals }
) => {
  // @ts-ignore
  return <ErrorRepeaterFormalite {...args} lang={globals?.locale || "en"} />;
};

const AllBaseRepeaterError = TemplateRepeaterError.bind({});

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(100);
  });
});
/// ----------------------------Error in array

test("Formalite: Test Error in Repeater", async () => {
  render(<AllBaseRepeaterError themeMode="light" />);

  const submitButton = screen.getByRole("button", { name: "Submit" });
  userEvent.click(submitButton);

  const allErrorTexts = await screen.findAllByText(/Required/i);
  expect(allErrorTexts).toHaveLength(3);

  userEvent.click(submitButton);
  expect(allErrorTexts).toHaveLength(3);
});

/// -------------------------Error
test("Formalite: All component must have error with timeView", async () => {
  render(<AllBaseError themeMode="light" />);

  const submitButton = screen.getByRole("button", { name: "Submit" });
  // ----------
  const timeView = screen.getByRole("textbox", { name: /Choose time/ });
  userEvent.click(timeView);
  fireEvent.click(screen.getByRole("button", { name: "PM" }));
  userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  await waitForElementToBeRemoved(screen.getByRole("dialog"));
  // ----------
  const dateTimeView = screen.getAllByRole("textbox", { name: /Choose date/ });
  userEvent.click(dateTimeView[1]);
  fireEvent.click(
    screen.getByRole("button", { name: moment().format("MMM 10, YYYY") })
  );
  userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  await waitForElementToBeRemoved(screen.getByRole("dialog"));
  // ----------
  userEvent.click(dateTimeView[0]);
  fireEvent.click(
    screen.getByRole("button", { name: moment().format("MMM 10, YYYY") })
  );
  userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  await waitForElementToBeRemoved(screen.getByRole("dialog"));

  userEvent.click(submitButton);

  const avatarHelper = screen.getByText(/max size of 5000/i);
  await waitForElementToBeRemoved(avatarHelper);

  const allErrorTexts = screen.getAllByText(/Required/i);
  expect(allErrorTexts).toHaveLength(20);
});

/// -----------------------------Loading
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
/// --------------------------------DARK
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
