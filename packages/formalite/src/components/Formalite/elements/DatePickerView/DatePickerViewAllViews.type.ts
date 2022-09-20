import { TextFieldProps } from "@mui/material";
import { BaseViewType } from "@components/Formalite/Formalite.type";

export interface DatePickerViewAllViewsType extends BaseViewType {
  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: TextFieldProps;
}
