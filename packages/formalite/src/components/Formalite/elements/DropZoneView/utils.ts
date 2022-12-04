import {
  ImageDownloaderPromise,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";

// outside library
export const dropzoneImageDownloader = (
  filePath: string,
  controller: AbortController
) =>
  new Promise<ImageDownloaderPromise>((resolve, reject) => {
    fetch(filePath)
      .then((resp) => resp.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve({
            base64: reader.result,
            originalName: "original-name.jpg",
            size: 1234567,
          });
        };
      })
      .catch((e) => {
        reject(e);
      });
  });
// inside library

type DefaultValueType = {
  preview: string;
  uid: string;
};
export const fixDropZoneDefaultValue = (
  values: DefaultValueType[]
): OutsideFile[] => {
  return values.map((item) => ({
    ...item,
    original: "default",
    status: "not_downloaded",
    controller: new AbortController(),
    originalName: "default",
  }));
};

export const downloadBase64 = (base64: string, fileName: string) => {
  fetch(base64)
    .then((res) => res.blob())
    .then((res) => {
      const downloadUrl = window.URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
};
