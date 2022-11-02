import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import compare from "react-fast-compare";

import {
  RadioGroupViewType,
  RadioGroupStateType,
  RadioGroupStateEnum,
  RadioGroupViewOptionsType,
  FormatOptionFnType,
} from "@components/Formalite/elements/RadioGroupView/RadioGroupView.type";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { GroupViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import RadioGroupViewAllViews from "@components/Formalite/elements/RadioGroupView/RadioGroupViewAllViews";
import { FetchingDataEnum } from "@components/base/model";
import { ObjectSchema } from "yup";

type RadioGroupViewProps<T> = {
  allData: RadioGroupViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  formatOptionFn?: FormatOptionFnType;
};

const formatOptions = (
  options: RadioGroupViewOptionsType,
  formatOptionFn: FormatOptionFnType
) => {
  const newOptions: typeof options = {};
  Object.keys(options).forEach((key) => {
    newOptions[key] = formatOptionFn(options[key]);
  });
  return newOptions;
};

const defaultFormatOption: FormatOptionFnType = (option) => option;

const RadioGroupView = <T extends FormikValues>(
  props: RadioGroupViewProps<T>
) => {
  const {
    allData,
    name,
    formik,
    loading,
    validationSchema,
    translator,
    formatOptionFn = defaultFormatOption,
  } = props;
  const { helperText, ...inputProps } = allData.inputProps;
  const [dataStatus, setDataStatus] = useState<RadioGroupStateType>({
    status: RadioGroupStateEnum.PENDING,
    data: {},
  });

  const loadFunction = useCallback(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      setDataStatus({ status: RadioGroupStateEnum.PENDING, data: {} });
      const funcResult = allData.dataFetching.options();
      funcResult
        .then((res) => {
          setDataStatus({
            status: RadioGroupStateEnum.READY,
            data: formatOptions(res, formatOptionFn),
          });
        })
        .catch((e) => {
          setDataStatus({
            status: RadioGroupStateEnum.REJECTED,
            data: {},
            error: e,
          });
        });
    }
  }, [allData.dataFetching, formatOptionFn]);

  useEffect(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      loadFunction();
    } else if (
      allData.dataFetching.error ||
      (!allData.dataFetching.loading && !allData.dataFetching.data)
    ) {
      setDataStatus({
        status: RadioGroupStateEnum.REJECTED,
        data: {},
      });
    } else if (allData.dataFetching.loading) {
      setDataStatus({
        status: RadioGroupStateEnum.PENDING,
        data: {},
      });
    } else if (allData.dataFetching.data) {
      setDataStatus({
        status: RadioGroupStateEnum.READY,
        data: formatOptions(allData.dataFetching.data, formatOptionFn),
      });
    }
  }, [allData.dataFetching]);

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <GroupViewSkeleton hasHelper={!!helperText} />
      </Grid>
    );
  }

  return (
    <Grid
      item
      {...allData.layoutProps}
      display="flex"
      container
      direction="column"
    >
      <RadioGroupViewAllViews
        formik={formik}
        validationSchema={validationSchema}
        translator={translator}
        name={name}
        dataStatus={dataStatus}
        allInputProps={allData.inputProps}
        labelProps={allData.labelProps}
        loadFunction={
          allData?.dataFetching.type === FetchingDataEnum.AUTOMATIC
            ? loadFunction
            : allData?.dataFetching.onRetry
        }
        {...inputProps}
      />
    </Grid>
  );
};
export default React.memo(RadioGroupView, (prevProps, nextProps) => {
  const prevDataFetching = prevProps.allData.dataFetching;
  const nextDataFetching = nextProps.allData.dataFetching;
  return (
    baseMemo(prevProps, nextProps) &&
    compare(prevDataFetching, nextDataFetching)
  );
}) as typeof RadioGroupView;
