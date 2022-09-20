import {
  BaseViewType,
  FetchingDataType,
  ViewTypes,
} from "@components/Formalite/Formalite.type";
import { TextFieldProps, AutocompleteProps } from "@mui/material";

export interface AutoCompleteViewOptionsDataType {
  [key: string]: {
    label: string | JSX.Element;
    [key: string]: any;
  };
}
export type SingleAutoCompleteViewOptionType = {
  key: string;
  label: string | JSX.Element;
};
export type AutoCompleteViewOptionsType = SingleAutoCompleteViewOptionType[];

export interface AutoCompleteViewType extends BaseViewType {
  type: ViewTypes.AutoCompleteView;

  /**
   * Specify props that passed to MUI Autocomplete component
   * @see [MUI AutocompleteProps](https://mui.com/material-ui/api/autocomplete/)
   */
  autoCompleteProps?: Omit<
    AutocompleteProps<
      SingleAutoCompleteViewOptionType,
      true | false,
      true | false,
      true | false
    >,
    "options" | "onChange" | "isOptionEqualToValue" | "renderInput"
  > & {
    onChange?: (
      value: string | JSX.Element | (string | JSX.Element)[] | undefined
    ) => void;
  };

  /**
   * Specify props that passed to MUI TextField component
   * @see [MUI TextFieldProps](https://mui.com/material-ui/api/text-field/)
   */
  inputProps: Omit<TextFieldProps, "onChange">;

  /**
   * Choosing type of data fetching for this component
   */
  dataFetching: FetchingDataType<AutoCompleteViewOptionsDataType>;
}
