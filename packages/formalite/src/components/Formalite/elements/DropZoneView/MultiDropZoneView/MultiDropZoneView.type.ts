import { DropzoneOptions } from "react-dropzone";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { SxProps } from "@mui/material";
import {
  BaseViewType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { FormikProps } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  CustomFile,
  ImageDownloaderPromise,
  OutsideFile,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { Theme } from "@mui/material/styles";

export interface MultiDropZoneViewType extends BaseViewType {
  type: ViewTypes.MultiDropZoneView;

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
    label: string;

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
    file: File,
    progress: (progress: number) => void,
    uploadController: AbortController
  ) => Promise<string | undefined>;

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

  /**
   * Choose that MultiDropZoneView shows preview
   */
  showPreview?: boolean;

  /**
   * Choose size of MultiDropZoneView
   */
  isSmallView?: boolean;
}

export type MultiDropZoneViewProps<T> = {
  allData: MultiDropZoneViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
};

export interface UploadMultiFileProps extends DropzoneOptions {
  error?: boolean;
  files: (CustomFile | OutsideFile)[];
  showPreview: boolean;
  onRemove: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  setFile: Dispatch<SetStateAction<(CustomFile | OutsideFile)[]>>;
  setToFormik: (object: any) => void;
  uploadFunction: (item: CustomFile) => void;
  uploadController: AbortController;
}
