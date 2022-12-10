import { act } from "react-dom/test-utils";
import React from "react";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiDropZoneView } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.stories";
import fetchMock from "jest-fetch-mock";
import { render, screen } from "../../../../../config/test-utils";
import { ImageDownloaderPromise } from "../Components/Global.type";
import { SingleDropZoneView } from "./SingleDropZoneView.stories";

beforeEach(() => {
  jest.resetAllMocks();
  fetchMock.resetMocks();
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
  const file = new File(["file"], "ping.png", {
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

  // retry
  const retryIcon = await screen.findByTestId("ReplayIcon");
  userEvent.click(retryIcon);
  const retryIconAfter = await screen.findByTestId("ReplayIcon");
  await waitFor(async () => {
    expect(retryIconAfter).toBeInTheDocument();
  });
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

test("Single Drop Zone: is Rendered when delete get rejected -> SingleDropZoneView", async () => {
  const a = fetchMock.mockResponseOnce(
    JSON.stringify({ rates: { CAD: 1.42 } })
  );
  window.URL.createObjectURL = jest.fn();
  render(
    // @ts-ignore
    <SingleDropZoneView
      {...SingleDropZoneView.args}
      withIni
      imageDownloader={undefined}
      onDelete={(id, isFromDefault) =>
        new Promise<void>((res, rej) => {
          setTimeout(() => {
            rej(new Error("some Error"));
          }, 0);
        })
      }
    />
  );
  const downloadIcon = screen.getByTestId("DownloadIcon");
  expect(downloadIcon).toBeInTheDocument();

  userEvent.click(downloadIcon);
  expect(a).toBeCalledTimes(1);

  // click remove
  const closeIcons = await screen.getByTestId("CloseIcon");
  userEvent.click(closeIcons);
  const text = await screen.findByText(/some Error/i);
  expect(text).toBeInTheDocument();

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

  // aa
});
