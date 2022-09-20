import { MenuItemProps, SelectProps } from "@mui/material";
import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "../../Formalite.type";

type AdditionalDataType = {
  [key: string]: any;
};

export interface SelectViewOptionsType {
  [key: string]: {
    label: string | JSX.Element;
    props?: MenuItemProps;
    additionalData?: AdditionalDataType;
  };
}

export type SelectInputPropsType = Omit<SelectProps, "onChange"> & {
  onChange?: (
    value: string | null,
    additionalData?: AdditionalDataType
  ) => void;
  helperText?: string;
};

export interface SelectViewType extends BaseViewType {
  type: ViewTypes.SelectView;

  /**
   * Specify regex for checking input text
   */
  mustRegex?: RegExp;

  /**
   * Props contain:
   * All the props that can passed to MUI Select component
   * @see [Mui SelectProps](https://mui.com/material-ui/api/select/#props)
   *
   * @props helperText
   */
  inputProps: SelectInputPropsType;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<SelectViewOptionsType>;
}

export enum SelectStateEnum {
  READY = "ready",
  PENDING = "pending",
  REJECTED = "rejected",
}

export type SelectGroupStateType = {
  status: SelectStateEnum;
  data: SelectViewOptionsType;
  error?: Error;
};
