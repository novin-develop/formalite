import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import moment from "moment";
import { DateTimePicker } from "./DateTimePickerView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Date Time Picker View: is Rendered -> DateTimePickerView", async () => {
  // @ts-ignore
  render(<DateTimePicker {...DateTimePicker.args} />);

  const textView = screen.getByRole("textbox", { name: /Choose date/ });
  // const clockIcon = await screen.findByTestId("ClockIcon");
  userEvent.click(textView);

  expect(screen.getByRole("dialog"));

  fireEvent.click(
    screen.getByRole("button", { name: moment().format("MMM 10, YYYY") })
  );

  fireEvent.click(screen.getByRole("button", { name: "PM" }));

  const now = moment().format("hh:mm");

  await waitFor(async () => {
    expect(textView).toHaveValue(
      `${moment().set("date", 10).format("L")} ${now} pm`
    );
  });

  fireEvent.click(screen.getByRole("button", { name: "AM" }));

  await waitFor(async () => {
    expect(textView).toHaveValue(
      `${moment().set("date", 10).format("L")} ${now} am`
    );
  });
});
