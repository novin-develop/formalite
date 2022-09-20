import { ReactNode } from "react";
import type {
  CheckboxProps,
  FormGroupProps,
  FormLabelProps,
} from "@mui/material";
import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "../../Formalite.type";

type AdditionalDataType = {
  [key: string]: any;
};

export type CheckGroupInputPropsType = Omit<FormGroupProps, "onChange"> & {
  onChange?: (
    value: string[] | null,
    additionalData?: AdditionalDataType
  ) => void;
  helperText?: string;
  label?: ReactNode;
};

export interface CheckGroupViewOptionsType {
  [key: string]: {
    label: string | JSX.Element;
    props?: CheckboxProps;
    additionalData?: AdditionalDataType;
  };
}

export interface CheckGroupViewType extends BaseViewType {
  type: ViewTypes.CheckGroupView;

  /**
   * Specify props that passed to MUI FormLabel component
   * @see [MUI FormLabelProps](https://mui.com/material-ui/api/form-label/#props)
   */
  labelProps: FormLabelProps<"legend">;

  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: CheckGroupInputPropsType;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<CheckGroupViewOptionsType>;
}

export enum CheckGroupStateEnum {
  READY = "ready",
  PENDING = "pending",
  REJECTED = "rejected",
}

export type CheckGroupStateType = {
  status: CheckGroupStateEnum;
  data: CheckGroupViewOptionsType;
  error?: Error;
};
