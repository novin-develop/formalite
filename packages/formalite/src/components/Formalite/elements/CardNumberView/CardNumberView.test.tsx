import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Base } from "./CardNumberView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Card Number View: is Rendered -> CardNumberView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const textInput = screen.getByRole("textbox");

  await waitFor(async () => {
    userEvent.type(textInput, "a123b456c123");
  });

  expect(textInput).toHaveValue("123 456");
});
