import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TextDropZoneView } from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Text Drop Zone: is Rendered -> TextDropZoneView", async () => {
  // @ts-ignore
  render(<TextDropZoneView {...TextDropZoneView.args} />);

  const textView = screen.getByRole("textbox");
  const icon = screen.getByTestId("AttachFileIcon");

  expect(textView).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});
