import type {
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";

type AdditionalDataType = {
  [key: string]: any;
};

export type BigRadioGroupInputPropsType = Omit<
  RadioGroupProps,
  "onChange" | "row"
> & {
  onChange?: (
    value: string | null,
    additionalData?: AdditionalDataType
  ) => void;
  helperText?: string;
};

export type BigRadioGroupViewOptionType = {
  label: string | JSX.Element;
  description?: string | JSX.Element;
  props?: RadioProps;
  additionalData?: AdditionalDataType;
};

export interface BigRadioGroupViewOptionsType {
  [key: string]: BigRadioGroupViewOptionType;
}

export interface BigRadioGroupViewType extends BaseViewType {
  type: ViewTypes.BigRadioGroupView;

  /**
   * Specify props that passed to MUI FormLabel component
   * @see [MUI FormLabelProps](https://mui.com/material-ui/api/form-label/#props)
   */
  labelProps?: FormLabelProps<"legend">;

  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: BigRadioGroupInputPropsType;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<BigRadioGroupViewOptionsType>;
}
