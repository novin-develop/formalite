import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { Base } from "./SwitchGroupView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Switch View: is Rendered -> SwitchGroupView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  await waitFor(async () => {
    const SwitchViews = screen.getAllByRole("checkbox");
    expect(SwitchViews).toHaveLength(2);
  });
});
