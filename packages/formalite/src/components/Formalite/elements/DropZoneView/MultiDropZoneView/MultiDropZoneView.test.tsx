import { act } from "react-dom/test-utils";
import { ImageDownloaderPromise } from "@components/Formalite";
import { render, screen } from "@config/test-utils";
import { SingleDropZoneView } from "@components/Formalite/elements/DropZoneView/SingleDropZoneView/SingleDropZoneView.stories";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MultiDropZoneView } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.stories";

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
      originalName: "original-name.test",
      size: 1234567,
    });
  });

test("Multi Drop Zone: is Rendered -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
      withIni
      imageDownloader={TestImageDownloader}
      isSmallView={undefined}
    />
  );
  const title = screen.getByText("Drop or Select file");
  const icon = screen.getByTestId("CloudUploadOutlinedIcon");
  await waitFor(async () => {
    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
  userEvent.click(icon);
  await waitFor(async () => {
    expect(screen.queryByText("retry")).not.toBeInTheDocument();
  });
});

test("Small Drop Zone: is Rendered -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
      withIni={false}
      imageDownloader={TestImageDownloader}
      isSmallView
      inputProps={{
        label: "label",
      }}
    />
  );
  const title = screen.getByText("Drop or Select file");
  const icon = screen.getByTestId("CloudUploadOutlinedIcon");
  await waitFor(async () => {
    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
  userEvent.click(icon);
  await waitFor(async () => {
    expect(screen.queryByText("retry")).not.toBeInTheDocument();
  });
});

test("Multi Drop Zone: is Rendered with ini data-> MultiDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  const onDeleteFunc = jest.fn();
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
      withIni
      isSmallView
      inputProps={{
        label: "aaa",
        helperText: undefined,
      }}
      imageDownloader={TestImageDownloader}
      onUpload={(file, progress) =>
        new Promise<string>((resolve, reject) => {
          setTimeout(() => {
            progress(50);
          }, 0);
          setTimeout(() => {
            resolve(new Date().getTime().toString());
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
  const item = await screen.findAllByText(/original-name/i);
  expect(item).toHaveLength(2);
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

  expect(await screen.findByText(/ping.json/i)).toBeInTheDocument();
  expect(onSelectFunc).toBeCalledTimes(1);
  const closeIcons = await screen.findAllByTestId("CloseIcon");
  await waitFor(async () => {
    expect(closeIcons).toHaveLength(3);
  });

  // click remove image
  userEvent.click(closeIcons[2]);
  const closeIcons2 = await screen.findAllByTestId("CloseIcon");
  await waitFor(async () => {
    expect(closeIcons2).toHaveLength(3);
  });
});

test("Multi Drop Zone: is Rendered with adding item without id -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
      withIni={false}
      isSmallView
      imageDownloader={TestImageDownloader}
      onUpload={(file, progress) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(undefined);
          }, 1);
        })
      }
    />
  );
  await waitFor(async () => {
    expect(await screen.findByText(/drop or select/i)).toBeInTheDocument();
  });

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
  const item = await screen.findByText(/ping.json/i);
  await waitFor(async () => {
    expect(item).toBeInTheDocument();
  });
});

test("Multi Drop Zone: is Rendered with reject  -> MultiDropZoneView", async () => {
  jest.resetAllMocks();
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
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
  expect(await screen.findAllByText(/original-name/i)).toHaveLength(2);

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

  const text = await screen.findByText(/some Error/i);
  expect(text).toBeInTheDocument();
});

test("Multi Zone: is Rendered with error in imageDownloader -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
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

test("Multi Zone: Drop Reject -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
      withIni
      isSmallView
      inputProps={{
        label: "aaa",
        dropZoneOptions: {
          accept: {
            "image/png": [".svg,.png"],
          },
        },
      }}
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

  expect(await screen.findByText(/File type must be/i)).toBeInTheDocument();
});

test("Multi Drop Zone: is Rendered without imageDownloader -> MultiDropZoneView", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView
      {...MultiDropZoneView.args}
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
  const downloadIcons = await screen.getAllByTestId("DownloadIcon");
  expect(downloadIcons).toHaveLength(2);

  // click remove
  const closeIcons = await screen.getAllByTestId("CloseIcon");
  userEvent.click(closeIcons[0]);
  await waitForElementToBeRemoved(closeIcons[0]);
});
