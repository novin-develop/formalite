import { ViewTypes } from "@components/Formalite/Formalite.type";
import { DatePickerProps } from "@mui/x-date-pickers";
import type { DatePickerViewAllViewsType } from "../DatePickerViewAllViews.type";

type OnChangeDateType = Date | null;
type DatePickerType = {
  type: ViewTypes.DatePickerView;

  /**
   * Specify props that passed to MUI DatePicker component
   * @see [MUI DatePickerProps](https://mui.com/x/api/date-pickers/date-picker/#props)
   */
  datePickerProps?: Omit<
    DatePickerProps,
    "onChange" | "renderInput" | "value" | "reduceAnimations"
  >;

  /**
   * @function A callback function that runs when a change occurred in DatePickerView
   *
   * @description As an arg of callback ,gives you selected date
   */
  onChange?: (date: OnChangeDateType) => void;
};

export type DatePickerViewType = DatePickerViewAllViewsType & DatePickerType;
