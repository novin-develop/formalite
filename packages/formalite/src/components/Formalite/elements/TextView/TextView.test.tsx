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

test("TextView: is Rendered -> PasswordView", async () => {
  // @ts-ignore
  render(<PasswordMode {...PasswordMode.args} />);
  await waitFor(async () => {
    const PasswordView = await screen.findByLabelText(/Password Input/i);
    expect(PasswordView).toBeInTheDocument();
  });

  const PasswordViewIcon = screen.getByRole("button", {
    name: /Toggle password visibility/i,
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

/* test("TextView: is Cursors are correct -> PasswordView", async () => {
  // @ts-ignore
  render(<PasswordMode {...PasswordMode.args} />);
  const PasswordView = (await screen.findByLabelText(
    /Password Input/i
  )) as HTMLInputElement;
  await waitFor(async () => {
    userEvent.type(PasswordView, "Some Password");
    createSelection(PasswordView, 5, 10);
  });

  console.log(PasswordView.selectionStart, PasswordView.selectionEnd);

  const PasswordViewIcon = screen.getByRole("button", {
    name: /Toggle password visibility/i,
  });
  userEvent.click(PasswordViewIcon);

  const NewPasswordView = (await screen.findByLabelText(
    /Password Input/i
  )) as HTMLInputElement;

  console.log(NewPasswordView.selectionStart, NewPasswordView.selectionEnd);
}); */
