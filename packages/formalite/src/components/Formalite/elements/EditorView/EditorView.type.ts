import { BaseViewType, ViewTypes } from "@components/Formalite/Formalite.type";
import { IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { CustomFile } from "@components/Formalite";

export interface EditorViewType extends BaseViewType {
  type: ViewTypes.EditorView;

  /**
   * A callback function that runs when Upload occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param file > The chosen file
   * @param progress > A callback that gives progress number in arg
   * @param uploadController > uploadController to connect to axios for auto abort
   */
  onUpload?: (
    file: CustomFile
  ) => Promise<{ url: string; alt: string; href: string }>;

  /**
   * Props that contain
   *
   * All props that can passed to @wangeditor/editor wangeditor component
   * @see [wangeditor component](https://www.wangeditor.com/en/v5/)
   *
   * @prop label
   *
   * @prop helperText
   *
   */
  editorProps: {
    label?: string;
    helperText?: string | JSX.Element;
    editorConfig?: Partial<IEditorConfig>;
    toolbarConfig?: Partial<IToolbarConfig>;
    toolbarComponentProps?: Object;
    editorComponentProps?: Object;
  };
}
