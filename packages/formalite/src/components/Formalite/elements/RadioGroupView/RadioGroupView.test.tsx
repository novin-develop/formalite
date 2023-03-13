import React from "react";
import { render, screen } from "@config/test-utils";
import { act } from "react-dom/test-utils";
import { Base } from "@components/Formalite/elements/RadioGroupView/RadioGroupView.stories";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { FetchingDataEnum } from "@components/base/model";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Radio Group: is Rendered -> RadioGroupView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const radioLists = screen.getAllByRole("radio");
  await waitFor(async () => {
    expect(radioLists).toHaveLength(2);
  });
});

/// ============================================================= AUTOMATIC

test("Radio Group: is Automatic Fetch Resolve  OK -> RadioGroupView", async () => {
  const onChangeFn = jest.fn();

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
        onChange: onChangeFn,
      }}
      labelProps={{}}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const SelectView = screen.getByRole("radiogroup");
  await waitFor(() => {
    userEvent.click(SelectView);
  });

  const AllOptions = screen.getAllByRole("radio");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });

  userEvent.click(AllOptions[1]);
  await waitFor(async () => {
    expect(onChangeFn).toBeCalledTimes(1);
    expect(AllOptions[1]).toBeChecked();
  });
});

test("Radio Group: is Rendered -> RadioGroupView", async () => {
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
      labelProps={{}}
    />
  );

  // check
  const ProgressView = screen.getAllByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const ErrorText = screen.getByText("Error");
  expect(ErrorText).toBeInTheDocument();
});

/// ============================================================= MANUAL

test("Radio Group: is MANUAL Fetch Loading Test -> RadioGroupView", async () => {
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
      labelProps={{}}
    />
  );

  // check
  await waitFor(async () => {
    const ProgressView = await screen.findByRole("progressbar");
    expect(ProgressView).toBeInTheDocument();
  });
});

test("Radio Group: is MANUAL Fetch Error Test -> RadioGroupView", async () => {
  const mockFn = jest.fn();

  render(
    <Base
      labelProps={{}}
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
    ErrorElement = await screen.findByText("Problem in receiving data!");
    RetryBtn = await screen.findByRole("button");
    expect(ErrorElement).toBeInTheDocument();
    expect(RetryBtn).toBeInTheDocument();

    userEvent.click(RetryBtn);
  });
  await waitFor(() => {
    expect(mockFn).toHaveBeenCalledWith("called");
  });
});
