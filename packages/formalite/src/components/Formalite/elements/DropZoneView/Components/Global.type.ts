export interface CustomFile extends File {
  original: "selected";
  path?: string;
  preview: string;
  status: string;
  progress?: number;
  uid?: string;
  errorText?: string;
  controller: AbortController;
}
export interface OutsideFile {
  original: "default";
  status?: string;
  uid?: string;
  preview: string;
  base64?: string | ArrayBuffer | null;
  originalName: string;
  size?: number;
  errorText?: string;
  controller: AbortController;
}

export type ImageDownloaderPromise = {
  base64: string | ArrayBuffer | null;
  originalName: string;
  size: number;
};
