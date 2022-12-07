import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createSelection, render, screen } from "../../../../config/test-utils";
import { PasswordMode, Simple } from "./TextView.stories";

/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("TextView: is Rendered -> TextView", async () => {
  // @ts-ignore
  render(<Simple {...Simple.args} />);

  await waitFor(async () => {
    const TextView = await screen.findByRole("textbox", {
      name: /Title Input/i,
    });
    expect(TextView).toBeInTheDocument();
  });
});

test("TextView: is Rendered and click icon -> PasswordView", async () => {
  // @ts-ignore
  render(<PasswordMode {...PasswordMode.args} />);
  await waitFor(async () => {
    const PasswordView = await screen.findByLabelText(/Password Input/i);
    expect(PasswordView).toBeInTheDocument();
  });

  const PasswordViewIcon = screen.getByRole("button", {
    name: /fg-toggle-password-visibility/i,
  });

  await waitFor(async () => {
    const InvisibleIcon = screen.getByTestId("VisibilityOffOutlinedIcon");
    expect(InvisibleIcon).toBeInTheDocument();
  });

  userEvent.click(PasswordViewIcon);

  await waitFor(async () => {
    const VisibleIcon = screen.getByTestId("VisibilityOutlinedIcon");
    expect(VisibleIcon).toBeInTheDocument();
  });
});

test("TextView: is focus are correct -> PasswordView", async () => {
  // @ts-ignore
  render(<PasswordMode {...PasswordMode.args} />);
  const PasswordView = (await screen.findByLabelText(
    /Password Input/i
  )) as HTMLInputElement;
  await waitFor(async () => {
    userEvent.type(PasswordView, "Some Password");
  });
  expect(PasswordView).toHaveFocus();

  const PasswordViewIcon = screen.getByRole("button", {
    name: /fg-toggle-password-visibility/i,
  });

  await waitFor(async () => {
    userEvent.click(PasswordViewIcon);
  });

  expect(PasswordView).not.toHaveFocus();
});

test("TextView: mustRegex is working -> TextView", async () => {
  // @ts-ignore
  render(<Simple {...Simple.args} mustRegex={/^[0-9]{1,}$/} />);
  const TextView = await screen.findByRole("textbox", {
    name: /Title Input/i,
  });
  expect(TextView).toBeInTheDocument();

  await waitFor(async () => {
    userEvent.type(TextView, "123abc123");
  });
  expect(TextView).toHaveValue("123123");
});

test("TextView: textView onChange error -> TextView", async () => {
  render(
    // @ts-ignore
    <Simple
      {...Simple.args}
      inputProps={{
        onChange: () => {
          throw new Error("this Error is OK");
        },
      }}
    />
  );

  const textBox = screen.getByRole("textbox");

  await waitFor(async () => {
    userEvent.type(textBox, "s");
  });

  expect(textBox).toBeInTheDocument();
});

test("TextView: is Rendered with is on updateMode -> TextView", async () => {
  // @ts-ignore
  render(<Simple {...Simple.args} showOnUpdate />);

  await waitFor(async () => {
    const TextView = await screen.queryByRole("textbox", {
      name: /Title Input/i,
    });
    expect(TextView).toBeNull();
  });
});
