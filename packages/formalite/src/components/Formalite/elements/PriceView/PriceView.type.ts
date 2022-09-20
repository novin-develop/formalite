import { TextFieldProps } from "@mui/material";
import { NumberFormatPropsBase } from "react-number-format";
import { BaseViewType, ViewTypes } from "../../Formalite.type";

export interface PriceViewType extends BaseViewType {
  type: ViewTypes.PriceView;

  /**
   * Specify regex for checking input text
   */
  mustRegex?: RegExp;

  /**
   * Specify props that passed to input
   * @see [Mui TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: Omit<TextFieldProps, "onChange"> & {
    onChange?: (value: number) => void;
  };

  /**
   * Specify props that passed to numberFormant
   * @see [React Number Format](https://github.com/s-yadav/react-number-format)
   */
  numberFormatProps?: NumberFormatPropsBase<any>;
}
