import { TextFieldProps } from "@mui/material";
import React from "react";
import { BaseViewType, ViewTypes } from "../../Formalite.type";

export interface TextViewType extends BaseViewType {
  type: ViewTypes.TextView;

  /**
   * Specify regex for checking input text
   */
  mustRegex?: RegExp;

  /**
   * Specify props that passed to input
   * @see [Mui TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: Omit<TextFieldProps, "onChange"> & {
    onChange?: (
      value: string,
      event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
}
