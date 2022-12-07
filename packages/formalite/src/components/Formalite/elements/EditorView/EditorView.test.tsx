import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { Base } from "./EditorView.stories";

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = () => {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      toJSON: () => {},
    };
  };

  range.getClientRects = () => {
    return {
      item: (index) => null,
      length: 0,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      *[Symbol.iterator]() {},
    };
  };

  return range;
};

test("Editor View: is Rendered -> EditorView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const textView = screen.getByText("test");
  const undo = screen.getByTestId("UndoIcon");
  const redo = screen.getByTestId("RedoIcon");
  const rtlBtn = screen.getAllByRole("button")[17];

  await waitFor(async () => {
    userEvent.click(rtlBtn);
    expect(textView).toHaveStyle({ direction: "rtl" });
  });

  await waitFor(async () => {
    userEvent.click(undo);
    expect(textView).not.toHaveAttribute("class");
  });

  await waitFor(async () => {
    userEvent.click(redo);
    expect(textView).toHaveStyle({ direction: "rtl" });
  });
});

/* test("Editor View: is Rendered -> EditorView2", async () => {
  // @ts-ignore
  const { container } = render(<Base {...Base.args} />);
  const a = container.querySelector(".ql-editor")!;
  const undo = container.querySelector(".ql-undo")!;
  const redo = container.querySelector(".ql-redo")!;
  a.textContent = "Hello";
  expect(a).toHaveTextContent("Hello");
  // @ts-ignore
  undo.click();

  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(a).toHaveTextContent("test");
  userEvent.click(redo);
  expect(a).toHaveTextContent("Hello");
}); */
