import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { FetchingDataEnum } from "../../../base/model";
import { Base } from "./CheckGroupView.stories";
import { render, screen } from "../../../../config/test-utils";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Check View: is Rendered -> CheckGroupView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);

  const SwitchViews = await screen.findAllByRole("checkbox");

  await waitFor(async () => {
    expect(SwitchViews).toHaveLength(2);
  });

  userEvent.click(SwitchViews[1]);
  await waitFor(async () => {
    expect(SwitchViews[1]).toBeChecked();
  });

  userEvent.click(SwitchViews[1]);
  await waitFor(async () => {
    expect(SwitchViews[1]).not.toBeChecked();
  });
});

test("Check View: is Automatic Fetch Resolve  OK -> CheckView", async () => {
  const OnChangeFunc = jest.fn();
  render(
    <Base
      labelProps={{}}
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      dataFetching={{
        type: FetchingDataEnum.AUTOMATIC,
        // eslint-disable-next-line sonarjs/no-identical-functions
        options: () =>
          // eslint-disable-next-line sonarjs/no-identical-functions
          new Promise((resolve, reject) => {
            // eslint-disable-next-line sonarjs/no-identical-functions
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
                  additionalData: {
                    a: 1,
                    b: 2,
                  },
                },
              });
            }, 1);
          }),
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
        onChange: OnChangeFunc,
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const AllOptions = screen.getAllByRole("checkbox");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });

  await waitFor(async () => {
    userEvent.click(AllOptions[1]);
    expect(OnChangeFunc).toBeCalledTimes(1);
  });
});

test("Check View: is Automatic Fetch Reject OK -> CheckView", async () => {
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
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const ErrorText = screen.getByText("Error");
  expect(ErrorText).toBeInTheDocument();
});

/// ============================================================= MANUAL

test("Check View: is MANUAL Fetch Loading Test -> CheckView", async () => {
  render(
    <Base
      labelProps={{}}
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

test("Check View: is MANUAL Fetch Error Test -> CheckView", async () => {
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
