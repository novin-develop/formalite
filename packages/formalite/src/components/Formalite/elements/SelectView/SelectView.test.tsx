import { render, screen } from "@config/test-utils";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { FetchingDataEnum } from "@components/base/model";
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

/// ============================================================= AUTOMATIC

test("Select View: is Automatic Fetch Resolve  OK -> SelectView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      dataFetching={{
        type: FetchingDataEnum.AUTOMATIC,
        options: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                one: {
                  label: "one",
                  additionalData: {
                    x: 1,
                    y: 2,
                  },
                },
                two: {
                  label: "two",
                },
              });
            }, 1);
          }),
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const SelectView = screen.getByRole("button");
  await waitFor(() => {
    userEvent.click(SelectView);
  });

  const AllOptions = screen.getAllByRole("option");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });
});

test("Select View: is Automatic Fetch Reject OK -> SelectView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      dataFetching={{
        type: FetchingDataEnum.AUTOMATIC,
        options: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error("Error"));
            }, 1);
          }),
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const ErrorText = screen.getByText("Error");
  expect(ErrorText).toBeInTheDocument();
});

/// ============================================================= MANUAL

test("Select View: is MANUAL Fetch Loading Test -> SelectView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      dataFetching={{
        type: FetchingDataEnum.MANUAL,
        loading: true,
        error: false,
        onRetry: () => {
          console.log("fg forever");
        },
        data: undefined,
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
      }}
    />
  );

  // check
  await waitFor(async () => {
    const ProgressView = await screen.findByRole("progressbar");
    expect(ProgressView).toBeInTheDocument();
  });
});

test("Select View: is MANUAL Fetch Error Test -> SelectView", async () => {
  const mockFn = jest.fn();

  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      dataFetching={{
        type: FetchingDataEnum.MANUAL,
        loading: false,
        error: true,
        onRetry: () => {
          mockFn("called");
        },
        data: undefined,
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
      }}
    />
  );
  // check
  let ErrorElement: HTMLElement;
  let RetryBtn: HTMLElement;

  await waitFor(async () => {
    ErrorElement = await screen.findByText("Something went wrong!");
    RetryBtn = await screen.findByRole("button");
    expect(ErrorElement).toBeInTheDocument();
    expect(RetryBtn).toBeInTheDocument();

    userEvent.click(RetryBtn);
  });
  await waitFor(() => {
    expect(mockFn).toHaveBeenCalledWith("called");
  });
});
