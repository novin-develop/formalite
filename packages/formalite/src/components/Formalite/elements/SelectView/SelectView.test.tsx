import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Base } from "./SelectView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Select View: is Rendered -> SelectView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const SelectView = screen.getByRole("button");
  await waitFor(() => {
    userEvent.click(SelectView);
  });
  const AllOptions = screen.getAllByRole("option");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });
});
