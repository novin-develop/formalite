import {
  BaseViewType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { ReactQuillProps } from "react-quill";

export interface EditorViewType extends BaseViewType {
  type: ViewTypes.EditorView;

  /**
   * Props that contain
   *
   * All props that can passed to react-quill ReactQuill component
   * @see [react-quill ReactQuillProps](https://www.npmjs.com/package/react-quill#props)
   *
   * @prop label
   *
   * @prop helperText
   *
   * @prop isToolbarSimple --> Choose type of toolbar
   */
  editorProps: ReactQuillProps & {
    /**
     * Choose type of toolbar in react-quill
     */
    isToolbarSimple: boolean;
    label?: string;
    helperText?: string | JSX.Element;
  };
}
