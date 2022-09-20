import { ReactNode } from "react";
import type {
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "../../Formalite.type";

type AdditionalDataType = {
  [key: string]: any;
};

export type RadioGroupInputPropsType = Omit<RadioGroupProps, "onChange"> & {
  onChange?: (
    value: string | null,
    additionalData?: AdditionalDataType
  ) => void;
  helperText?: string;
  label?: ReactNode;
};

export type RadioGroupViewOptionType = {
  label: string | JSX.Element;
  props?: RadioProps;
  additionalData?: AdditionalDataType;
};

export interface RadioGroupViewOptionsType {
  [key: string]: RadioGroupViewOptionType;
}

export interface RadioGroupViewType extends BaseViewType {
  type: ViewTypes.RadioGroupView;

  /**
   * Specify props that passed to MUI FormLabel component
   * @see [MUI FormLabelProps](https://mui.com/material-ui/api/form-label/#props)
   */
  labelProps: FormLabelProps<"legend">;

  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: RadioGroupInputPropsType;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<RadioGroupViewOptionsType>;
}

export enum RadioGroupStateEnum {
  READY = "ready",
  PENDING = "pending",
  REJECTED = "rejected",
}

export type RadioGroupStateType = {
  status: RadioGroupStateEnum;
  data: RadioGroupViewOptionsType;
  error?: Error;
};

export type FormatOptionFnType<T = RadioGroupViewOptionType> = (option: T) => T;
