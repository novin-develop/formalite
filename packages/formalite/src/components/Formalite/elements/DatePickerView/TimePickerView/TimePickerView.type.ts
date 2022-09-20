import { ViewTypes } from "@components/Formalite/Formalite.type";
import { TimePickerProps } from "@mui/x-date-pickers";
import type { DatePickerViewAllViewsType } from "../DatePickerViewAllViews.type";

type OnChangeDateType = Date | null;
type TimePickerType = {
  type: ViewTypes.TimePickerView;

  /**
   * Specify props that passed to MUI TimePicker component
   * @see [MUI TimePickerProps](https://mui.com/x/api/date-pickers/time-picker/#props)
   */
  timePickerProps?: Omit<
    TimePickerProps,
    "onChange" | "renderInput" | "value" | "reduceAnimations"
  >;

  /**
   * @function A callback function that runs when a change occurred in DatePickerView
   *
   * @description As an arg of callback ,gives you selected date
   */
  onChange?: (date: OnChangeDateType) => void;
};

export type TimePickerViewType = DatePickerViewAllViewsType & TimePickerType;
