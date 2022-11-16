import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../../config/test-utils";
import { PasswordMode, Simple } from "./TextView.stories";

/**
 * @jest-environment jsdom
 */

test("TextView: is Rendered -> TextView", () => {
  // @ts-ignore
  render(<Simple {...Simple.args} />);
  const TextView = screen.findByRole("textbox", { name: /Title Input/i });
  expect(TextView).toBeDefined();
});

test("TextView: is Rendered -> PasswordView", () => {
  // @ts-ignore
  render(<PasswordMode {...PasswordMode.args} />);
  const PasswordView = screen.findByLabelText(/Password Input/i);
  expect(PasswordView).toBeDefined();

  const PasswordViewIcon = screen.getByRole("button", {
    name: /Toggle password visibility/i,
  });

  const InvisibleIcon = screen.getByTestId("VisibilityOffOutlinedIcon");
  expect(InvisibleIcon).toBeDefined();

  userEvent.click(PasswordViewIcon);

  const VisibleIcon = screen.getByTestId("VisibilityOutlinedIcon");
  expect(VisibleIcon).toBeDefined();
});
