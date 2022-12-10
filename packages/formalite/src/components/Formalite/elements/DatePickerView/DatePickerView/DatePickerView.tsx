import React from "react";
import { FormikProps, FormikValues } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid, TextField } from "@mui/material";
import { checkIsRequired, getData } from "@components/Formalite/config/utils";
import { Language } from "@components/base/model";
import { ObjectSchema } from "yup";
import { baseMemo } from "../../Bases/functions/memo";
import DatePickerLocalizationProvider from "../DatePickerLocalizationProvider";
import type { DatePickerViewType } from "./DatePickerView.type";
import { TextViewSkeleton } from "../../Bases/SkeletonBase";

export interface DatePickerViewProps<T> {
  allData: DatePickerViewType;
  name: keyof T;
  lang: Language;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
}
const DatePickerView = <T extends FormikValues>(
  props: DatePickerViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator, lang } =
    props;
  const { label, helperText, ...inputProps } = allData.inputProps;

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton hasHelper={!!helperText} />
      </Grid>
    );
  }
  return (
    <Grid item {...allData.layoutProps}>
      <DatePickerLocalizationProvider lang={lang}>
        <DatePicker
          label={label}
          value={getData({ source: formik.values, key: name })}
          onChange={(date: Date | null) => {
            formik.setFieldValue(String(name), date);
            if (allData.onChange) {
              allData.onChange(date);
            }
          }}
          clearable
          reduceAnimations
          renderInput={({ error, ...restParams }) => (
            <TextField
              fullWidth
              name={String(name)}
              required={checkIsRequired({
                schema: validationSchema,
                formikValues: formik.values,
                key: String(name),
              })}
              error={
                error ||
                (getData({ source: formik.touched, key: name }) &&
                  Boolean(getData({ source: formik.errors, key: name })))
              }
              helperText={
                getData({ source: formik.touched, key: name }) &&
                getData({ source: formik.errors, key: name })
                  ? translator(getData({ source: formik.errors, key: name }))
                  : helperText
              }
              {...restParams}
              {...inputProps}
            />
          )}
          {...allData.datePickerProps}
        />
      </DatePickerLocalizationProvider>
    </Grid>
  );
};
export default React.memo(DatePickerView, (prevProps, nextProps) => {
  return baseMemo(prevProps, nextProps);
}) as typeof DatePickerView;
