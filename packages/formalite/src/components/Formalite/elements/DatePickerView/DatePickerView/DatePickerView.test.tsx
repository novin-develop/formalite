import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor } from "@testing-library/react";
import moment from "moment";
import React from "react";
import { DatePicker } from "./DatePickerView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Date Picker View: is Rendered -> DatePickerView", async () => {
  // @ts-ignore
  render(<DatePicker {...DatePicker.args} />);

  const textView = screen.getByRole("textbox", { name: /Choose date/ });
  // const clockIcon = await screen.findByTestId("ClockIcon");
  userEvent.click(textView);

  expect(screen.getByRole("dialog"));

  fireEvent.click(
    screen.getByRole("button", { name: moment().format("MMM 10, YYYY") })
  );

  await waitFor(async () => {
    expect(textView).toHaveValue(`${moment().set("date", 10).format("L")}`);
  });
});
