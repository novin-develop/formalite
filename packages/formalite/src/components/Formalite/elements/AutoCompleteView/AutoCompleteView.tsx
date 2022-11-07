import React, { useCallback, useEffect, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { Autocomplete, Grid, TextField } from "@mui/material";
import compare from "react-fast-compare";
import { TextViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import { checkIsRequired, getData } from "@components/Formalite/config/utils";
import ViewError from "@components/Formalite/components/ViewError";
import { FetchingDataEnum } from "@components/base/model";
import ViewPending from "@components/Formalite/components/ViewPending";
import { ObjectSchema } from "yup";
import { baseMemo } from "../Bases/functions/memo";
import type {
  AutoCompleteViewOptionsDataType,
  AutoCompleteViewType,
  AutoCompleteViewOptionsType,
  SingleAutoCompleteViewOptionType,
} from "./AutoCompleteView.type";

export interface AutoCompleteViewProps<T> {
  allData: AutoCompleteViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
}
enum OptionsStateEnum {
  READY = "ready",
  PENDING = "pending",
  REJECTED = "rejected",
}
type OptionsStateType = {
  status: OptionsStateEnum;
  data: AutoCompleteViewOptionsDataType;
  error?: Error;
};

type AutoCompleteNewValue =
  | string
  | SingleAutoCompleteViewOptionType
  | (string | SingleAutoCompleteViewOptionType)[]
  | null;

const handleOptionsData = (
  optionsObj: AutoCompleteViewOptionsDataType
): AutoCompleteViewOptionsType => {
  return Object.entries(optionsObj).map(([key, value]) => ({
    key,
    label: value.label,
  }));
};

const AutoCompleteView = <T extends FormikValues>(
  props: AutoCompleteViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const { label, helperText, ...inputProps } = allData.inputProps;

  const { onChange, ...autoCompleteProps } = allData.autoCompleteProps || {};

  const [optionsStatus, setOptionsStatus] = useState<OptionsStateType>({
    status: OptionsStateEnum.PENDING,
    data: {},
  });

  const handleGetValue = (): AutoCompleteNewValue => {
    const options = handleOptionsData(optionsStatus.data);
    const formikData = getData({ source: formik.values, key: name });
    if (Array.isArray(formikData)) {
      return formikData.map((value: string) => {
        return (
          options.find((option) =>
            autoCompleteProps?.freeSolo
              ? option.label === value
              : option.key === value
          ) || { key: value, label: value }
        );
      });
    }
    return options.find((option) => option.key === formikData) || null;
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleOptionsChange = (value: AutoCompleteNewValue) => {
    const isFreeSolo = autoCompleteProps?.freeSolo;
    const isMultiple = autoCompleteProps?.multiple;
    let finalValue;
    if (isMultiple && value instanceof Array) {
      const newValues = value.map((oldValue) => {
        if (typeof oldValue === "string") {
          return oldValue;
        }
        return isFreeSolo ? oldValue.label : oldValue.key;
      });
      finalValue = newValues;
    } else if (value instanceof Object && !(value instanceof Array)) {
      finalValue = isFreeSolo ? value.label : value.key;
    } else if (typeof value === "string") {
      finalValue = value;
    } else if (!value) {
      finalValue = isMultiple ? [] : "";
    }
    formik.setFieldValue(String(name), finalValue);
    if (onChange) {
      onChange(finalValue);
    }
  };

  const loadFunction = useCallback(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      setOptionsStatus({ status: OptionsStateEnum.PENDING, data: {} });
      const funcResult = allData.dataFetching.options();
      funcResult
        .then((res) => {
          setOptionsStatus({
            status: OptionsStateEnum.READY,
            data: res,
          });
        })
        .catch((e) => {
          setOptionsStatus({
            status: OptionsStateEnum.REJECTED,
            data: {},
            error: e,
          });
        });
    }
  }, [allData.dataFetching]);

  useEffect(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      loadFunction();
    } else if (
      allData.dataFetching.error ||
      (!allData.dataFetching.loading && !allData.dataFetching.data)
    ) {
      setOptionsStatus({
        status: OptionsStateEnum.REJECTED,
        data: {},
      });
    } else if (allData.dataFetching.loading) {
      setOptionsStatus({
        status: OptionsStateEnum.PENDING,
        data: {},
      });
    } else if (allData.dataFetching.data) {
      setOptionsStatus({
        status: OptionsStateEnum.READY,
        data: allData.dataFetching.data,
      });
    }
  }, [allData.dataFetching]);

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <TextViewSkeleton hasHelper={!!helperText} />
      </Grid>
    );
  }
  return (
    <Grid item {...allData.layoutProps}>
      {optionsStatus.status === OptionsStateEnum.READY && (
        <Autocomplete
          value={handleGetValue()}
          options={handleOptionsData(optionsStatus.data)}
          onChange={(_, value) => handleOptionsChange(value)}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              if (autoCompleteProps?.freeSolo) {
                return option.label === value;
              }
              return option.key === value;
            }
            return autoCompleteProps?.freeSolo
              ? option.label === value.label
              : option.key === value.key;
          }}
          renderInput={(params) => (
            <TextField
              name={String(name)}
              required={checkIsRequired({
                schema: validationSchema,
                formikValues: formik.values,
                key: String(name),
              })}
              error={
                getData({ source: formik.touched, key: name }) &&
                Boolean(getData({ source: formik.errors, key: name }))
              }
              label={label}
              helperText={
                getData({ source: formik.touched, key: name }) &&
                getData({ source: formik.errors, key: name })
                  ? translator(getData({ source: formik.errors, key: name }))
                  : helperText
              }
              {...params}
              {...inputProps}
              InputProps={{
                ...(params.InputProps ? params.InputProps : {}),
                ...(inputProps.InputProps ? inputProps.InputProps : {}),
              }}
            />
          )}
          {...(autoCompleteProps || {})}
        />
      )}
      {optionsStatus.status === OptionsStateEnum.PENDING && (
        <ViewPending label={label} />
      )}
      {optionsStatus.status === OptionsStateEnum.REJECTED && (
        <ViewError
          error={optionsStatus.error}
          reloadFunction={
            allData?.dataFetching.type === FetchingDataEnum.AUTOMATIC
              ? loadFunction
              : allData?.dataFetching.onRetry
          }
          label={label}
        />
      )}
    </Grid>
  );
};
export default React.memo(AutoCompleteView, (prevProps, nextProps) => {
  const prevDataFetching = prevProps.allData.dataFetching;
  const nextDataFetching = nextProps.allData.dataFetching;
  return (
    baseMemo(prevProps, nextProps) &&
    compare(prevDataFetching, nextDataFetching)
  );
}) as typeof AutoCompleteView;
