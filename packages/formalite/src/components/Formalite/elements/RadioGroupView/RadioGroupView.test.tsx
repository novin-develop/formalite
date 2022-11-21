import React from "react";
import { render, screen } from "@config/test-utils";
import { act } from "react-dom/test-utils";
import { Base } from "@components/Formalite/elements/RadioGroupView/RadioGroupView.stories";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Radio Group: is Rendered -> RadioGroupView ", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const radioLists = screen.getAllByRole("radio");
  await waitFor(async () => {
    expect(radioLists).toHaveLength(2);
  });
});
