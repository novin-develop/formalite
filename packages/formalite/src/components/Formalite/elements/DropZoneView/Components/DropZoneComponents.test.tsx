import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { render, screen } from "@config/test-utils";
import { MultiDropZoneView } from "@components/Formalite/elements/DropZoneView/MultiDropZoneView/MultiDropZoneView.stories";
import { fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ImageDownloaderPromise } from "@components/Formalite";

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

const DropZoneProps = {
  ...MultiDropZoneView.args,
  withIni: false,
  showPreview: true,
  imageDownloader: TestImageDownloader,
  isSmallView: undefined,
  onUpload: () =>
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve(new Date().getTime().toString());
      }, 0);
    }),
};

test("Multi Drop Zone: is images works MP4 -> DropZoneComponents", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView {...DropZoneProps} />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");

  // MP4
  const file1 = new File(["file"], "ping.mp4", {
    type: "video/mp4",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file1],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);
  const closeIcon = await screen.findAllByTestId(/CloseIcon/i);
  expect(closeIcon).toHaveLength(1);
});

test("Multi Drop Zone: is images works DOC -> DropZoneComponents", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView {...DropZoneProps} />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");

  // DOC
  const file = new File(["file"], "ping.doc", {
    type: "application/msword",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);

  const closeIcon = await screen.findAllByTestId(/CloseIcon/i);
  expect(closeIcon).toHaveLength(1);
});

test("Multi Drop Zone: is images works PDF -> DropZoneComponents", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView {...DropZoneProps} />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  // PDF
  const file = new File(["file"], "ping.pdf", {
    type: "application/pdf",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);

  const closeIcon = await screen.findAllByTestId(/CloseIcon/i);
  expect(closeIcon).toHaveLength(1);
});

test("Multi Drop Zone: is images works ZIP -> DropZoneComponents", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView {...DropZoneProps} />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  const file = new File(["file"], "ping.zip", {
    type: "application/zip",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);

  const closeIcon = await screen.findAllByTestId(/CloseIcon/i);
  expect(closeIcon).toHaveLength(1);
});

test("Multi Drop Zone: is images works PNG -> DropZoneComponents", async () => {
  render(
    // @ts-ignore
    <MultiDropZoneView {...DropZoneProps} />
  );

  // select file for upload
  const fileInput = screen.getByTestId("drop-input");
  const file = new File(["file"], "ping.png", {
    type: "image/png",
  });
  window.URL.createObjectURL = jest.fn().mockImplementation(() => "url");
  Object.defineProperty(fileInput, "files", {
    value: [file],
  });
  fireEvent.dragEnter(fileInput);
  fireEvent.dragOver(fileInput);
  fireEvent.drop(fileInput);

  const closeIcon = await screen.findAllByTestId(/CloseIcon/i);
  expect(closeIcon).toHaveLength(1);
});

/// //////////////////////////////////////////////////////////////
