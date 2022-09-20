import { TextFieldProps } from "@mui/material";
import { BaseViewType, ViewTypes } from "../../Formalite.type";

export interface CardNumberViewType extends BaseViewType {
  type: ViewTypes.CardNumberView;

  /**
   * Specify regex for checking input text
   * @example /^([1-9]\d*(\.)\d{1,4}|0?(\.)\d*[1-9]\d*|0?|[1-9]\d*|[1-9]\d*(\.))$/
   */
  mustRegex?: RegExp;

  /**
   * Specify props that passed to mui TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: Omit<TextFieldProps, "onChange"> & {
    onChange?: (value: string) => void;
  };

  /**
   * Specify a mask for checking input text format
   * @example 000 000
   */
  mask: string;
}
