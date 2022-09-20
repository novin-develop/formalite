import React, { ReactChild } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";

import { Language } from "@components/base/model";

interface DatePickerLocalizationProviderProps {
  lang: Language;
  children: ReactChild;
}
const DatePickerLocalizationProvider = (
  props: DatePickerLocalizationProviderProps
) => {
  const { lang, children } = props;
  return (
    <LocalizationProvider
      dateAdapter={(lang === "fa" ? AdapterJalali : AdapterDateFns) as any}
    >
      {children}
    </LocalizationProvider>
  );
};
export default DatePickerLocalizationProvider;
