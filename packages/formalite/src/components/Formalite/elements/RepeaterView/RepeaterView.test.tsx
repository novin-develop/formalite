import React from "react";
import { render, screen } from "@config/test-utils";
import userEvent from "@testing-library/user-event";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ViewTypes } from "@components/Formalite";
import { Base } from "./RepeaterView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Repeater View: remove btn test -> RepeaterView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const removeButtons = screen.getAllByRole("button", { name: "Remove" });
  await waitFor(() => {
    userEvent.click(removeButtons[0]);
    removeButtons[0].click();
  });
  await waitForElementToBeRemoved(removeButtons);
});

test("Repeater View: is Rendered -> RepeaterView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const allText = screen.getAllByRole("textbox");
  await waitFor(async () => {
    expect(allText).toHaveLength(4);
  });
});

test("Repeater View: add btn test -> RepeaterView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const addBtn = screen.getByRole("button", { name: "Custom text" });
  await waitFor(async () => {
    expect(addBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    userEvent.click(addBtn);
  });
  const allText = screen.getAllByRole("textbox");
  await waitFor(async () => {
    expect(allText).toHaveLength(6);
  });

  const removeButtons = screen.getAllByRole("button", { name: "Remove" });
  await waitFor(async () => {
    expect(removeButtons).toHaveLength(3);
  });
});

test("Repeater View: disable disableOfRemoveFunction -> RepeaterView", async () => {
  render(
    <Base
      layoutProps={{
        xs: 12,
      }}
      disableOfRemoveFunction={() => true}
      options={{
        name: {
          type: ViewTypes.TextView,
          layoutProps: {
            xs: 6,
          },
          inputProps: {
            label: "Name",
          },
        },
        family: {
          type: ViewTypes.TextView,
          layoutProps: {
            xs: 6,
          },
          inputProps: {
            label: "Family",
          },
        },
      }}
    />
  );
  const removeButtons = screen.getAllByRole("button", { name: "Remove" });

  await waitFor(async () => {
    expect(removeButtons[0]).toBeDisabled();
    expect(removeButtons[1]).toBeDisabled();
  });
});

test("Repeater View: disable removeAddBtn -> RepeaterView", async () => {
  render(
    <Base
      layoutProps={{
        xs: 12,
      }}
      removeAddBtn
      buttonText="Custom text"
      options={{
        name: {
          type: ViewTypes.TextView,
          layoutProps: {
            xs: 6,
          },
          inputProps: {
            label: "Name",
          },
        },
        family: {
          type: ViewTypes.TextView,
          layoutProps: {
            xs: 6,
          },
          inputProps: {
            label: "Family",
          },
        },
      }}
    />
  );
  const removeButtons = screen.queryByRole("button", { name: "Custom text" });

  await waitFor(async () => {
    expect(removeButtons).not.toBeInTheDocument();
  });
});
