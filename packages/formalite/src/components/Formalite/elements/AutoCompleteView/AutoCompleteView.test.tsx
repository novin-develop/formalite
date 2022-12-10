import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { FetchingDataEnum } from "@components/base/model";
import {
  FreeSoloAutoCompleteView,
  SimpleAutoCompleteView,
} from "./SimpleAutoCompleteView.stories";
import {
  MultipleAutoCompleteView,
  ComplexAutoCompleteView,
} from "./ComplexAutoCompleteView.stories";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

// ------------------------------------- FREE SOLO
test("FreeSolo Auto Complete: is Rendered with submit -> AutoCompleteView", async () => {
  render(
    // @ts-ignore
    <FreeSoloAutoCompleteView {...FreeSoloAutoCompleteView.args} withSubmit />
  );
  userEvent.click(screen.getByRole("button", { name: "submit" }));
  const error = await screen.findByText("title is a required field");
  expect(error).toBeInTheDocument();
});
test("FreeSolo Auto Complete: is Rendered -> AutoCompleteView", async () => {
  // @ts-ignore
  render(<FreeSoloAutoCompleteView {...FreeSoloAutoCompleteView.args} />);
  const textBox = screen.getByRole("combobox");
  // -------------------------- set input
  await waitFor(async () => {
    userEvent.type(textBox, "one{enter}");
  });
  expect(textBox).toHaveValue("one");
  // -------------------------- set input
  await waitFor(async () => {
    userEvent.type(textBox, "{backspace}{backspace}{backspace}some text{tab}");
  });
  expect(textBox).toHaveValue("some text");
  // -------------------------- click on X
  const closeIcon = screen.getByTestId("CloseIcon");
  await waitFor(async () => {
    userEvent.hover(textBox);
    userEvent.click(closeIcon);
  });
  expect(textBox).toHaveValue("");

  // -------------------------- select option
  await waitFor(async () => {
    userEvent.type(textBox, "one");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("option", { name: "one" }));
  });
  expect(textBox).toHaveValue("one");
});
test("FreeSolo Auto Complete: is Rendered with ini -> AutoCompleteView", async () => {
  render(
    // @ts-ignore
    <FreeSoloAutoCompleteView {...FreeSoloAutoCompleteView.args} withIni />
  );
  const textBox = screen.getByRole("combobox");
  await waitFor(async () => {
    expect(textBox).toHaveValue("one");
  });
});
/// ----------------------------------------- SIMPLE
test("Simple Auto Complete: is Rendered -> AutoCompleteView", async () => {
  // @ts-ignore
  render(<SimpleAutoCompleteView {...SimpleAutoCompleteView.args} withExtra />);

  const textBox = screen.getByRole("combobox");
  // -------------------------- set wrong input
  await waitFor(async () => {
    userEvent.type(textBox, "some text{tab}");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByText("extra text"));
  });
  expect(textBox).toHaveValue("");
  // -------------------------- set right input
  await waitFor(async () => {
    userEvent.type(textBox, "one");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("option", { name: "one" }));
  });
  expect(textBox).toHaveValue("one");
  // -------------------------- click on X
  const closeIcon = screen.getByTestId("CloseIcon");
  await waitFor(async () => {
    userEvent.hover(textBox);
    userEvent.click(closeIcon);
  });
  expect(textBox).toHaveValue("");
});
test("Simple Auto Complete: is Rendered with ini -> AutoCompleteView", async () => {
  render(
    // @ts-ignore
    <SimpleAutoCompleteView {...SimpleAutoCompleteView.args} withIni />
  );
  const textBox = screen.getByRole("combobox");
  await waitFor(async () => {
    expect(textBox).toHaveValue("one");
  });
});
/// ---------------------------------------- Multiple
test("Multiple Auto Complete: is Rendered -> MultipleCompleteView", async () => {
  // @ts-ignore
  render(<MultipleAutoCompleteView {...MultipleAutoCompleteView.args} />);
  const textBox = screen.getByRole("combobox");
  /// --------------------------------- Select Two Options

  await waitFor(async () => {
    userEvent.type(textBox, "one");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("option", { name: "one" }));
  });
  await waitFor(async () => {
    userEvent.type(textBox, "two");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("option", { name: "two" }));
  });
  expect(screen.getByRole("button", { name: "two" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "one" })).toBeInTheDocument();

  // ---------------------------- remove one item
  const cancelIcons = screen.getAllByTestId("CancelIcon");
  await waitFor(async () => {
    userEvent.click(cancelIcons[0]);
  });
  expect(screen.queryByRole("button", { name: "one" })).toBeNull();
});
test("Multiple Auto Complete: is Rendered with ini data -> MultipleCompleteView", async () => {
  render(
    // @ts-ignore
    <MultipleAutoCompleteView {...MultipleAutoCompleteView.args} withIni />
  );
  await waitFor(async () => {
    expect(screen.getByRole("button", { name: "one" })).toBeInTheDocument();
  });
});

/// ---------------------------------------- COMPLEX
test("Complex Auto Complete: is Rendered -> ComplexAutoCompleteView", async () => {
  // @ts-ignore
  render(<ComplexAutoCompleteView {...ComplexAutoCompleteView.args} />);
  const textBox = screen.getByRole("combobox");
  /// --------------------------------- Select One Options

  await waitFor(async () => {
    userEvent.type(textBox, "one");
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("option", { name: "one" }));
  });
  expect(screen.getByRole("button", { name: "one" })).toBeInTheDocument();
});

test("Complex Auto Complete: is Rendered with outside ini value -> ComplexAutoCompleteView", async () => {
  // @ts-ignore
  render(<ComplexAutoCompleteView {...ComplexAutoCompleteView.args} withIni />);
  await waitFor(async () => {
    expect(screen.getByRole("button", { name: "test" })).toBeInTheDocument();
  });
});
test("Complex Auto Complete: is Rendered with type text -> ComplexAutoCompleteView", async () => {
  // @ts-ignore
  render(<ComplexAutoCompleteView {...ComplexAutoCompleteView.args} />);
  const textBox = screen.getByRole("combobox");
  userEvent.type(textBox, "abcd{enter}");
  await waitFor(async () => {
    expect(screen.getByRole("button", { name: "abcd" })).toBeInTheDocument();
  });
});

/// //////////////////////////////// ------------------------------- data fetching

/// ============================================================= AUTOMATIC

test("Simple Auto Complete: is Automatic Fetch Resolve  OK -> SimpleAutoComplete", async () => {
  const OnChangeFunc = jest.fn();
  render(
    <SimpleAutoCompleteView
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
        label: "SimpleAutoCompleteView Title",
        helperText: "HelperText",
      }}
      autoCompleteProps={{
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

test("Simple Auto Complete: is Automatic Fetch Reject OK -> SimpleAutoComplete", async () => {
  render(
    <SimpleAutoCompleteView
      autoCompleteProps={{}}
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

test("Simple Auto Complete: is MANUAL Fetch Loading Test -> SimpleAutoComplete", async () => {
  render(
    <SimpleAutoCompleteView
      withExtra
      autoCompleteProps={{}}
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

test("Simple Auto Complete: is MANUAL Fetch Error Test -> SimpleAutoComplete", async () => {
  const mockFn = jest.fn();

  render(
    <SimpleAutoCompleteView
      autoCompleteProps={{}}
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
