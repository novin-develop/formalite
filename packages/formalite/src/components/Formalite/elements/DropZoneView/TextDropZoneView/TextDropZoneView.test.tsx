import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { TextDropZoneView } from "@components/Formalite/elements/DropZoneView/TextDropZoneView/TextDropZoneView.stories";
import { dropzoneImageDownloader } from "@components/Formalite/elements/DropZoneView/utils";
import { ImageDownloaderPromise } from "@components/Formalite";

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(0);
  });
});

const TestImageDownloader = () =>
  new Promise<ImageDownloaderPromise>((resolve, reject) => {
    resolve({
      base64: "reader.result",
      originalName: "original-name.jpg",
      size: 1234567,
    });
  });

test("Text Drop Zone: is Rendered -> TextDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <TextDropZoneView
      {...TextDropZoneView.args}
      withIni={false}
      onUpload={(file, progress) =>
        new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            resolve(new Date().getTime().toString());
          }, 1);
          onSelectFunc();
        })
      }
    />
  );

  const textView = screen.getByRole("textbox");
  const icon = screen.getByTestId("AttachFileIcon");
  await waitFor(async () => {
    expect(textView).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
  userEvent.click(icon);
  await waitFor(async () => {
    expect(screen.queryByText("retry")).not.toBeInTheDocument();
  });
});

test("Text Drop Zone: is Rendered with ini data-> TextDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  const onDeleteFunc = jest.fn();
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
        sx: (theme) => ({
          color: "red",
        }),
      }}
      imageDownloader={TestImageDownloader}
      onUpload={(file, progress) =>
        new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            progress(50);
          }, 0);
          setTimeout(() => {
            resolve(new Date().getTime().toString());
            // reject(new Error("aaaa"));
          }, 0);
          onSelectFunc();
        })
      }
      onDelete={(id, isFromDefault) =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 0);
          onDeleteFunc();
        })
      }
    />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  const file = new File(["file"], "ping.json", {
    type: "application/json",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);
  expect(await screen.findByText("ping.json")).toBeInTheDocument();
  expect(onSelectFunc).toBeCalledTimes(1);
  expect(await screen.findByTestId("DownloadIcon")).toBeInTheDocument();
  expect(await screen.findAllByTestId("CloseIcon")).toHaveLength(2);
});

test("Text Drop Zone: is Rendered with adding item without id  -> TextDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <TextDropZoneView
      {...TextDropZoneView.args}
      withIni
      imageDownloader={TestImageDownloader}
      onUpload={(file, progress) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(undefined);
          }, 1);
          onSelectFunc();
        })
      }
    />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  const file = new File(["file"], "ping.json", {
    type: "application/json",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.drop(fileInput);
  expect(await screen.findByText("ping.json")).toBeInTheDocument();
});

test("Text Drop Zone: is Rendered with reject  -> TextDropZoneView", async () => {
  jest.resetAllMocks();
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <TextDropZoneView
      {...TextDropZoneView.args}
      withIni
      imageDownloader={TestImageDownloader}
      onUpload={(file, progress) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("some Error"));
          }, 0);
          onSelectFunc();
        })
      }
    />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  const file = new File(["file"], "ping.json", {
    type: "application/json",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.drop(fileInput);
  const text = await screen.findByText(/some Error/i);
  expect(text).toBeInTheDocument();
  // type text
  const textView = screen.getByRole("textbox");
  await waitFor(async () => {
    userEvent.type(textView, "-some text");
    expect(textView).toHaveValue("default text-some text");
  });
});

test("Text Drop Zone: is Rendered with error in imageDownloader -> TextDropZoneView", async () => {
  render(
    // @ts-ignore
    <TextDropZoneView
      {...TextDropZoneView.args}
      withIni
      imageDownloader={() =>
        new Promise<ImageDownloaderPromise>((resolve, reject) => {
          reject(new Error("some Error"));
        })
      }
    />
  );
  const text = await screen.findByText(/some Error/i);
  expect(text).toBeInTheDocument();
});

test("Text Drop Zone: is Rendered without imageDownloader -> TextDropZoneView", async () => {
  render(
    // @ts-ignore
    <TextDropZoneView
      {...TextDropZoneView.args}
      withIni
      imageDownloader={undefined}
      onDelete={(id, isFromDefault) =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 0);
        })
      }
    />
  );
  const text = await screen.findByText("200");
  expect(text).toBeInTheDocument();

  // click remove
  const closeIcons = await screen.getAllByRole("button");
  userEvent.click(closeIcons[1]);
  await waitForElementToBeRemoved(closeIcons[1]);
});
