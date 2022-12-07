import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "../../../../../config/test-utils";
import { ImageDownloaderPromise } from "../Components/Global.type";
import { AvatarDropZoneView } from "./AvatarDropZoneView.stories";

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

test("Avatar Drop Zone: is Rendered -> AvatarDropZoneView", async () => {
  render(
    // @ts-ignore
    <AvatarDropZoneView
      {...AvatarDropZoneView.args}
      withIni={false}
      imageDownloader={TestImageDownloader}
    />
  );
  const title = screen.getByText("Upload photo");

  await waitFor(async () => {
    expect(title).toBeInTheDocument();
  });
});

test("Avatar Drop Zone: is Rendered with ini data -> AvatarDropZoneView", async () => {
  const onSelectFunc = jest.fn();
  const onDeleteFunc = jest.fn();
  render(
    // @ts-ignore
    <AvatarDropZoneView
      {...AvatarDropZoneView.args}
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
  expect(
    await screen.findByTestId("DeleteOutlineOutlinedIcon")
  ).toBeInTheDocument();

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

  // click remove image
  const deleteIcon = await screen.findByTestId("DeleteOutlineOutlinedIcon");
  userEvent.click(deleteIcon);
  expect(await screen.findByText("Upload photo")).toBeInTheDocument();
  expect(onDeleteFunc).toBeCalledTimes(1);
  expect(onSelectFunc).toBeCalledTimes(1);
});

test("Avatar Drop Zone: is Rendered with adding item without id  -> AvatarDropZoneView", async () => {
  render(
    // @ts-ignore
    <AvatarDropZoneView
      {...AvatarDropZoneView.args}
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
  const title = await screen.findByText("Upload photo");

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
  await waitFor(async () => {
    expect(
      await screen.findByTestId("DeleteOutlineOutlinedIcon")
    ).toBeInTheDocument();
  });
});

test("Avatar Drop Zone: is Rendered with reject  -> AvatarDropZoneView", async () => {
  jest.resetAllMocks();
  const onSelectFunc = jest.fn();
  render(
    // @ts-ignore
    <AvatarDropZoneView
      {...AvatarDropZoneView.args}
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
  expect(
    await screen.findByTestId("DeleteOutlineOutlinedIcon")
  ).toBeInTheDocument();
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
});

test("Avatar Drop Zone: is Rendered when delete get rejected -> AvatarDropZoneView", async () => {
  const a = fetchMock.mockResponseOnce(
    JSON.stringify({ rates: { CAD: 1.42 } })
  );
  window.URL.createObjectURL = jest.fn();
  render(
    // @ts-ignore
    <AvatarDropZoneView
      {...AvatarDropZoneView.args}
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

  // click remove
  const closeIcons = await screen.getByTestId("DeleteOutlineOutlinedIcon");
  userEvent.click(closeIcons);
  const text = await screen.findByText(/some Error/i);
  expect(text).toBeInTheDocument();
});
