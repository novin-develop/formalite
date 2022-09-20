import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { CheckboxProps, FormGroupProps, FormLabelProps } from "@mui/material";
import { ReactNode } from "react";

type AdditionalDataType = {
  [key: string]: any;
};

export type SwitchGroupInputPropsType = Omit<FormGroupProps, "onChange"> & {
  onChange?: (
    value: string[] | null,
    additionalData?: AdditionalDataType
  ) => void;
  helperText?: string;
  label?: ReactNode;
};

export interface SwitchGroupViewOptionsType {
  [key: string]: {
    label: string | JSX.Element;
    props?: CheckboxProps;
    additionalData?: AdditionalDataType;
  };
}

export interface SwitchGroupViewType extends BaseViewType {
  type: ViewTypes.SwitchGroupView;
  /**
   * Specify props that passed to MUI FormLabel component
   * @see [MUI FormLabelProps](https://mui.com/material-ui/api/form-label/#props)
   */
  labelProps: FormLabelProps<"legend">;

  /**
   * Props contain:
   * All the props that can passed to MUI FormGroup component
   * @see [MUI FormGroupProps](https://mui.com/material-ui/api/form-group/#props)
   *
   * @props helperText
   *
   * @props label
   */
  inputProps: SwitchGroupInputPropsType;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<SwitchGroupViewOptionsType>;
}
