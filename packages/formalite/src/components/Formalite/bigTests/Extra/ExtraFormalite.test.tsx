import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { OneInputExtraComponent } from "@components/Formalite/bigTests/Extra/ExtraFromOneInput";
import { OneRepeaterExtraComponent } from "@components/Formalite/bigTests/Extra/ExtraFormOneRepeater";
import { CustomComponentExtraComponent } from "@components/Formalite/bigTests/Extra/ExtraCustomComponent";

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(100);
  });
});

// ================================================== ONE INPUT

test("Formalite: One Input Extra", async () => {
  render(<OneInputExtraComponent themeMode="dark" direction="rtl" />);
  const allTextViews = screen.getAllByRole("textbox");

  await waitFor(async () => {
    expect(allTextViews).toHaveLength(1);
  });
  await waitFor(async () => {
    userEvent.type(allTextViews[0], "{backspace}{backspace}");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
  });

  expect(await screen.findByText("aaa")).toBeInTheDocument();
});

test("Formalite: One Input Extra with error in Submit", async () => {
  render(
    <OneInputExtraComponent
      themeMode="dark"
      direction="rtl"
      onSubmit={() => {
        throw new Error("some Error");
      }}
    />
  );
  const allTextViews = screen.getAllByRole("textbox");

  await waitFor(async () => {
    expect(allTextViews).toHaveLength(1);
  });
  await waitFor(async () => {
    userEvent.click(screen.getByRole("button", { name: "Submit" }));
  });
});

test("Formalite: One Input Extra Loading or not Loading ", async () => {
  let allSkeleton: HTMLCollectionOf<Element>;

  await waitFor(async () => {
    const { container } = render(<OneInputExtraComponent themeMode="light" />);
    allSkeleton = container.getElementsByClassName("MuiSkeleton-root");
  });
  await waitFor(async () => {
    expect(allSkeleton).toHaveLength(0);
  });
  userEvent.click(screen.getByRole("button", { name: "setLoading" }));
  await waitFor(async () => {
    expect(allSkeleton).toHaveLength(1);
  });
  userEvent.click(screen.getByRole("button", { name: "setLoading" }));
  await waitFor(async () => {
    expect(allSkeleton).toHaveLength(0);
  });
});

test("Formalite: One Input Extra Rest Form", async () => {
  render(<OneInputExtraComponent themeMode="dark" direction="rtl" reIni />);

  const textViews = screen.getByRole("textbox");

  expect(textViews).toHaveValue("aa");

  await waitFor(async () => {
    userEvent.click(screen.getByRole("button", { name: "rest" }));
  });

  expect(textViews).toHaveValue("");
});

// ================================================== ONE REPEATER

test("Formalite: One Repeater Extra", async () => {
  const onResolve = jest.fn();
  const onReject = jest.fn();
  render(
    <OneRepeaterExtraComponent
      themeMode="dark"
      direction="rtl"
      resolve={onResolve}
      reject={onReject}
    />
  );

  const textViews = screen.getAllByRole("textbox");

  expect(textViews).toHaveLength(4);

  await waitFor(async () => {
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
  });

  await waitFor(async () => {
    userEvent.click(screen.getByRole("button", { name: "addRow" }));
  });

  const textViews2 = screen.getAllByRole("textbox");
  expect(textViews2).toHaveLength(6);
});

test("Formalite: One Repeater Extra in not valid form", async () => {
  const onResolve = jest.fn();
  const onReject = jest.fn();
  render(
    <OneRepeaterExtraComponent
      themeMode="dark"
      direction="rtl"
      resolve={onResolve}
      reject={onReject}
    />
  );

  const textViews = screen.getAllByRole("textbox");

  expect(textViews).toHaveLength(4);

  userEvent.click(screen.getAllByRole("button", { name: /remove/i })[0]);

  await waitFor(async () => {
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
  });
});

// ================================================== CUSTOM COMPONENT

test("Formalite: Custom TextView", async () => {
  render(<CustomComponentExtraComponent themeMode="dark" direction="rtl" />);
  const textView = screen.getByRole("textbox");

  expect(textView).toHaveValue("aa");

  await waitFor(async () => {
    userEvent.type(textView, "{backspace}{backspace}bb");
  });

  expect(textView).toHaveValue("bb");
});
