import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import moment from "moment";
import { TimePicker } from "./TimePickerView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Time Picker View: is Rendered -> TimePickerView", async () => {
  // @ts-ignore
  render(<TimePicker {...TimePicker.args} />);

  const textView = screen.getByRole("textbox", { name: /Choose time/ });
  // const clockIcon = await screen.findByTestId("ClockIcon");
  userEvent.click(textView);

  expect(screen.getByRole("dialog"));

  fireEvent.click(screen.getByRole("button", { name: "PM" }));

  const now = moment().format("hh:mm");

  await waitFor(async () => {
    expect(textView).toHaveValue(`${now} pm`);
  });

  fireEvent.click(screen.getByRole("button", { name: "AM" }));
  await waitFor(async () => {
    expect(textView).toHaveValue(`${now} am`);
  });
});
