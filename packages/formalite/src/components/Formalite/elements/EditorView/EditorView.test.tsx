import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Base } from "./EditorView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Editor View: is Rendered -> EditorView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const textView = screen.getByText("test");
  const undo = screen.getByTestId("UndoIcon");
  const redo = screen.getByTestId("RedoIcon");

  await waitFor(async () => {
    userEvent.type(textView, "123");
  });
  screen.debug(textView);
  /*
  expect(textView).toHaveTextContent("testabc");
  userEvent.click(undo);
  expect(textView).toHaveTextContent("testab");
  userEvent.click(redo);
  expect(textView).toHaveTextContent("testabc"); */
});
