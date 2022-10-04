import { BaseViewType, ViewTypes } from "@components/Formalite/Formalite.type";
import { DropzoneOptions } from "react-dropzone";
import { ReactNode } from "react";
import { CustomFile, ImageDownloaderPromise } from "@components/Formalite";

export interface AvatarDropZoneViewType extends BaseViewType {
  type: ViewTypes.AvatarDropZoneView;

  /**
   * Props that contain
   *
   * @prop onChange --> A callback that gives value in arg
   *
   * @prop label
   *
   * @prop helperText --> A string or ReactNode
   *
   * @prop dropZoneOptions --> Specify props that passed to react-dropzone Dropzone component
   * @see [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
   */
  inputProps: {
    onChange?: (value: string) => void;
    label: ReactNode;

    /**
     * Specify props that passed to react-dropzone Dropzone component
     * @see [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
     */
    dropZoneOptions?: Partial<DropzoneOptions>;
    helperText?: ReactNode;
  };

  /**
   * @function A callback function that runs when Upload occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param file The choosen file
   * @param progress A callback that gives progress number in arg
   */
  onUpload: (
    file: CustomFile,
    progress: (progress: number) => void,
    uploadController: AbortController
  ) => Promise<string>;

  /**
   * @function A callback function that runs when Delete occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param id id of selected item to be deleted
   * @param isFromDefault Tells you that this is a new item or it's from the default value
   */
  onDelete: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;

  /**
   * @function A callback function that must run when an image want to be downloded in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param pathUrl The url of downloaded image
   * @param controller A controller object that allows you to abort one or more DOM requests as and when desired.
   */
  imageDownloader?: (
    pathUrl: string,
    controller: AbortController
  ) => Promise<ImageDownloaderPromise>;
}
