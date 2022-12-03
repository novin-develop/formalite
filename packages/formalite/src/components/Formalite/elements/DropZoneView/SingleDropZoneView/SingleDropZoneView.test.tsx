import { act } from "react-dom/test-utils";
import React from "react";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../../../config/test-utils";
import { ImageDownloaderPromise } from "../Components/Global.type";
import { SingleDropZoneView } from "./SingleDropZoneView.stories";

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

test("Single Drop Zone: is Rendered -> SingleDropZoneView", async () => {
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
      withIni={false}
      imageDownloader={TestImageDownloader}
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

test("Single Drop Zone: is Rendered with ini data-> SingleDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  const onDeleteFunc = jest.fn();
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
      withIni
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
  expect(await screen.findByText(/original-name/i)).toBeInTheDocument();

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

  const closeIcon = await screen.findAllByTestId("CloseIcon");
  expect(await screen.findByText(/ping.json/i)).toBeInTheDocument();
  expect(onSelectFunc).toBeCalledTimes(1);
  expect(closeIcon).toHaveLength(1);

  // click remove image
  userEvent.click(closeIcon[0]);
  expect(await screen.findByText("Drop or Select file")).toBeInTheDocument();
});

test("Single Drop Zone: is Rendered with adding item without id  -> SingleDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
      withIni={false}
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
  expect(await screen.findByText(/ping.json/i)).toBeInTheDocument();
});

test("Single Drop Zone: is Rendered with reject  -> SingleDropZoneView", async () => {
  jest.resetAllMocks();
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
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
  expect(await screen.findByText(/original-name/i)).toBeInTheDocument();

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

test("Single Zone: is Rendered with error in imageDownloader -> SingleDropZoneView", async () => {
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
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

test("Single Drop Zone: is Rendered without imageDownloader -> SingleDropZoneView", async () => {
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
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
  const downloadIcon = await screen.getByTestId("DownloadIcon");
  expect(downloadIcon).toBeInTheDocument();

  // click remove
  const closeIcons = await screen.getByTestId("CloseIcon");
  userEvent.click(closeIcons);
  await waitForElementToBeRemoved(closeIcons);
});
