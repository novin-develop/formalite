import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import React from "react";
import { waitFor } from "@testing-library/react";
import { Base } from "./BigRadioGroupView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Big Radio Group View: is Rendered -> BigRadioGroupView", async () => {
  render(
    // @ts-ignore
    <Base
      {...Base.args}
      labelProps={{
        style: { background: "green" },
      }}
    />
  );
  const label = screen.getByTestId("label");
  await waitFor(async () => {
    expect(label).toHaveStyle({ background: "green", display: "none" });
  });
});
