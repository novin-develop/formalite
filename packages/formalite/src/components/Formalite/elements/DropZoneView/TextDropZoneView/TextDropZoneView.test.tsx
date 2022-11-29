import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TextDropZoneView } from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.stories";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";

beforeEach(() => {
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

test("Text Drop Zone: is Rendered -> TextDropZoneView", async () => {
  // @ts-ignore
  render(<TextDropZoneView {...TextDropZoneView.args} withIni={false} />);

  const textView = screen.getByRole("textbox");
  const icon = screen.getByTestId("AttachFileIcon");
  await waitFor(async () => {
    expect(textView).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
  await waitFor(async () => {
    userEvent.type(textView, "some text");
    expect(textView).toHaveValue("some text");
  });
});

test("Text Drop Zone: is Rendered -> TextDropZoneView", async () => {
  // @ts-ignore
  render(
    <TextDropZoneView
      withIni
      layoutProps={{
        md: 6,
        xs: 12,
      }}
      inputProps={{
        label: "aaa",
        helperText: `Allowed *.jpeg, *.jpg, *.png, *.gif`,
      }}
      imageDownloader={dropzoneImageDownloader}
      onUpload={(file, progress) =>
        new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            progress(50);
          }, 1000);
          setTimeout(() => {
            resolve(new Date().getTime().toString());
            // reject(new Error("aaaa"));
          }, 2000);
        })
      }
      onDelete={(id, isFromDefault) =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      }
    />
  );

  const textView = screen.getByRole("textbox");
  const icon = screen.getByTestId("AttachFileIcon");
  screen.debug();

  //  expect(textView).toHaveValue("default text");
});
