import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor } from "@testing-library/react";
import moment from "moment";
import React from "react";
import { Base } from "./ComponentView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Component View: is Rendered -> ComponentView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      render={(name, value, onChange, error, isTouched) => (
        <div style={{ border: "1px solid", padding: "8px" }}>
          <input
            name={name}
            value={value}
            type="text"
            onChange={(e) => {
              const data = e.target.value;
              onChange(data);
            }}
          />
        </div>
      )}
    />
  );

  const textView = await screen.findByRole("textbox");

  await waitFor(async () => {
    userEvent.type(textView, "some test");
  });

  expect(textView).toHaveValue("some test");
});
