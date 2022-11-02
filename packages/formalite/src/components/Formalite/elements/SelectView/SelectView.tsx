import React, { useCallback, useEffect, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import compare from "react-fast-compare";

import {
  SelectGroupStateType,
  SelectStateEnum,
  SelectViewType,
} from "@components/Formalite/elements/SelectView/SelectView.type";
import { Grid } from "@mui/material";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { TextViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import SelectViewAllViews from "@components/Formalite/elements/SelectView/SelectViewAllViews";
import { FetchingDataEnum } from "@components/base/model";
import { ObjectSchema } from "yup";

type SelectViewProps<T> = {
  allData: SelectViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
};

const SelectView = <T extends FormikValues>(props: SelectViewProps<T>) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const { helperText, ...inputProps } = allData.inputProps;
  const [dataStatus, setDataStatus] = useState<SelectGroupStateType>({
    status: SelectStateEnum.PENDING,
    data: {},
  });

  const loadFunction = useCallback(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      setDataStatus({ status: SelectStateEnum.PENDING, data: {} });
      const funcResult = allData.dataFetching.options();
      funcResult
        .then((res) => {
          setDataStatus({
            status: SelectStateEnum.READY,
            data: res,
          });
        })
        .catch((e) => {
          setDataStatus({
            status: SelectStateEnum.REJECTED,
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
      setDataStatus({
        status: SelectStateEnum.REJECTED,
        data: {},
      });
    } else if (allData.dataFetching.loading) {
      setDataStatus({
        status: SelectStateEnum.PENDING,
        data: {},
      });
    } else if (allData.dataFetching.data) {
      setDataStatus({
        status: SelectStateEnum.READY,
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
    <Grid
      item
      {...allData.layoutProps}
      style={{ display: "flex" }}
      container
      direction="column"
    >
      <SelectViewAllViews
        formik={formik}
        validationSchema={validationSchema}
        translator={translator}
        name={name}
        dataStatus={dataStatus}
        allInputProps={allData.inputProps}
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
export default React.memo(SelectView, (prevProps, nextProps) => {
  const prevDataFetching = prevProps.allData.dataFetching;
  const nextDataFetching = nextProps.allData.dataFetching;
  return (
    baseMemo(prevProps, nextProps) &&
    compare(prevDataFetching, nextDataFetching)
  );
}) as typeof SelectView;
