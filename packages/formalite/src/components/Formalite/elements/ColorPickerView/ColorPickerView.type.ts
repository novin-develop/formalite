import { TextFieldProps } from "@mui/material";
import {
  BaseViewType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";

export interface ColorPickerViewType extends BaseViewType {
  type: ViewTypes.ColorPickerView;

  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: Omit<TextFieldProps, "onChange">;
}
