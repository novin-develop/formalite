import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Base } from "./ColorPickerView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Color Picker: is Rendered -> ColorPickerView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} withExtra />);
  const TextView = screen.getByRole("textbox");

  await waitFor(async () => {
    userEvent.type(TextView, "#a152ac");
  });
  await waitFor(async () => {
    userEvent.hover(TextView);
    userEvent.click(TextView);
  });

  await waitFor(async () => {
    const colorCircle = await screen.findByTestId("colorCircle");
    expect(colorCircle).toHaveStyle({ backgroundColor: "#a152ac" });
  });

  userEvent.click(screen.getByText("extra text"));
  userEvent.click(TextView);

  const colorBtn = screen.getByTitle("#417505");
  userEvent.click(colorBtn);
  await waitFor(async () => {
    expect(TextView).toHaveValue("#417505");
  });

  userEvent.click(await screen.findByRole("button"));
  expect(TextView).toHaveValue("");
});
