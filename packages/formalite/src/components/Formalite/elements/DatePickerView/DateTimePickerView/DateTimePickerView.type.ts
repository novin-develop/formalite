import { ViewTypes } from "@components/Formalite/Formalite.type";
import { DateTimePickerProps } from "@mui/x-date-pickers";
import type { DatePickerViewAllViewsType } from "../DatePickerViewAllViews.type";

type OnChangeDateType = Date | null;
type DateTimePickerType = {
  type: ViewTypes.DateTimePickerView;

  /**
   * Specify props that passed to MUI DateTimePicker component
   * @see [MUI DateTimePickerProps](https://mui.com/x/api/date-pickers/date-time-picker/#props)
   */
  datePickerProps?: Omit<
    DateTimePickerProps,
    "onChange" | "renderInput" | "value" | "reduceAnimations"
  >;

  /**
   * @function A callback function that runs when a change occurred in DatePickerView
   *
   * @description As an arg of callback ,gives you selected date
   */
  onChange?: (date: OnChangeDateType) => void;
};

export type DateTimePickerViewType = DatePickerViewAllViewsType &
  DateTimePickerType;
