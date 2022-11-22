import React from "react";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Base } from "./PriceView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Price View: is Rendered -> PriceView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const textView = screen.getByRole("textbox", { name: "Price" });
  await waitFor(async () => {
    userEvent.type(textView, "12aa345");
  });
  await waitFor(async () => {
    expect(textView).toHaveValue("12,345");
  });
});

test("Price View: is work with REGEX -> PriceView", async () => {
  // @ts-ignore
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      mustRegex={/^[0-8]+$/}
      inputProps={{
        label: "Price",
        onChange: (value) => {
          // console.log(value);
        },
      }}
    />
  );

  const textView = screen.getByRole("textbox", { name: "Price" });

  await waitFor(async () => {
    userEvent.type(textView, "12aa39945");
  });
  await waitFor(async () => {
    expect(textView).toHaveValue("12,345");
  });
});
