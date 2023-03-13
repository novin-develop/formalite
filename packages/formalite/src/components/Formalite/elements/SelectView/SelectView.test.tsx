import React from "react";
import { render, screen } from "@config/test-utils";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
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

test("Select View: is Rendered with items -> SelectView", async () => {
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

test("Select View: is clear icon works -> SelectView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const SelectView = screen.getByRole("button");
  const clearIcon = screen.getByTestId("ClearIcon");

  expect(clearIcon).toHaveStyle({ visibility: "hidden" });

  userEvent.hover(SelectView);
  expect(clearIcon).toHaveStyle({ visibility: "visible" });

  userEvent.unhover(SelectView);
  expect(clearIcon).toHaveStyle({ visibility: "hidden" });

  userEvent.hover(SelectView);

  const icon = screen.getByTestId("ClearIcon");

  userEvent.click(icon);

  const itemWithValue = screen.queryByText(/one/i);
  await waitFor(async () => {
    expect(itemWithValue).toBeNull();
  });
});

test("Select View: is select options works -> SelectView", async () => {
  // @ts-ignore
  render(<Base {...Base.args} />);
  const SelectView = screen.getByRole("button");
  await waitFor(async () => {
    userEvent.click(SelectView);
  });
  const AllOptions = screen.getAllByRole("option");
  await waitFor(async () => {
    userEvent.click(AllOptions[1]);
  });

  await waitFor(async () => {
    expect(screen.queryByRole("option")).toBeNull();
    expect(SelectView).toHaveTextContent("two");
  });
});
/// ============================================================= Check if no option works

test("Select View: is remove no options works -> SelectView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      emptyItemLabel={null}
      dataFetching={{
        type: FetchingDataEnum.AUTOMATIC,
        options: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({});
            }, 1);
          }),
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
        onChange: () => {
          throw new Error("Error");
        },
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const SelectView = screen.getByRole("button");
  await waitFor(async () => {
    userEvent.click(SelectView);
  });
  expect(screen.queryByRole("option")).toBeNull();
});

test("Select View: is no options works -> SelectView", async () => {
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
            resolve({});
          }),
      }}
      inputProps={{
        label: "Select Title",
        helperText: "HelperText",
        onChange: () => {
          throw new Error("Error");
        },
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const SelectView = screen.getByRole("button");
  await waitFor(async () => {
    userEvent.click(SelectView);
  });
  expect(screen.queryAllByRole("option")).toHaveLength(1);
  expect(screen.getByText("No option")).toBeInTheDocument();
});

/// ============================================================= Check OnChange works

test("Select View: is onChange throw error works -> SelectView", async () => {
  render(
    <Base
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      emptyItemLabel="some string"
      dataFetching={{
        type: FetchingDataEnum.AUTOMATIC,
        options: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                one: {
                  label: "one",
                  additionalData: undefined,
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
        onChange: () => {
          throw new Error("Error");
        },
      }}
    />
  );

  // check
  const ProgressView = screen.getByRole("progressbar");
  await waitForElementToBeRemoved(ProgressView);

  const SelectView = screen.getByRole("button");
  await waitFor(async () => {
    userEvent.click(SelectView);
  });

  const AllOptions = screen.getAllByRole("option");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });
  await waitFor(async () => {
    userEvent.click(AllOptions[1]);
  });
  expect(SelectView).toBeInTheDocument();
});
/// ============================================================= AUTOMATIC

test("Select View: is Automatic Fetch Resolve  OK -> SelectView", async () => {
  const OnChangeFunc = jest.fn();
  render(
    <Base
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

  const SelectView = screen.getByRole("button");
  await waitFor(() => {
    userEvent.click(SelectView);
  });

  const AllOptions = screen.getAllByRole("option");
  await waitFor(async () => {
    expect(AllOptions).toHaveLength(2);
  });
  await waitFor(async () => {
    userEvent.click(AllOptions[1]);
    expect(OnChangeFunc).toBeCalledTimes(1);
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
