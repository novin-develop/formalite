import React, { useCallback, useEffect, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import compare from "react-fast-compare";
import { Grid } from "@mui/material";
import {
  CheckGroupViewType,
  CheckGroupStateEnum,
  CheckGroupStateType,
} from "@components/Formalite/elements/CheckGroupView/CheckGroupView.type";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { GroupViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";
import CheckGroupViewAllViews, {
  CheckComponentType,
} from "@components/Formalite/elements/CheckGroupView/CheckGroupViewAllViews";
import { FetchingDataEnum } from "@components/base/model";
import { ObjectSchema } from "yup";

export type CheckGroupViewProps<T> = {
  allData: CheckGroupViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  component?: CheckComponentType;
};

const CheckGroupView = <T extends FormikValues>({
  allData,
  name,
  formik,
  loading,
  validationSchema,
  translator,
  component,
}: CheckGroupViewProps<T>) => {
  const { helperText, ...inputProps } = allData.inputProps;
  const [dataStatus, setDataStatus] = useState<CheckGroupStateType>({
    status: CheckGroupStateEnum.PENDING,
    data: {},
  });

  const loadFunction = useCallback(() => {
    if (allData.dataFetching.type === FetchingDataEnum.AUTOMATIC) {
      setDataStatus({ status: CheckGroupStateEnum.PENDING, data: {} });
      const funcResult = allData.dataFetching.options();
      funcResult
        .then((res) => {
          setDataStatus({
            status: CheckGroupStateEnum.READY,
            data: res,
          });
        })
        .catch((e) => {
          setDataStatus({
            status: CheckGroupStateEnum.REJECTED,
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
        status: CheckGroupStateEnum.REJECTED,
        data: {},
      });
    } else if (allData.dataFetching.loading) {
      setDataStatus({
        status: CheckGroupStateEnum.PENDING,
        data: {},
      });
    } else if (allData.dataFetching.data) {
      setDataStatus({
        status: CheckGroupStateEnum.READY,
        data: allData.dataFetching.data,
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
      <CheckGroupViewAllViews
        formik={formik}
        validationSchema={validationSchema}
        translator={translator}
        name={String(name)}
        dataStatus={dataStatus}
        allInputProps={allData.inputProps}
        labelProps={allData.labelProps}
        component={component}
        loadFunction={
          allData.dataFetching.type === FetchingDataEnum.AUTOMATIC
            ? loadFunction
            : allData.dataFetching.onRetry
        }
        {...inputProps}
      />
    </Grid>
  );
};
export default React.memo(CheckGroupView, (prevProps, nextProps) => {
  const prevDataFetching = prevProps.allData.dataFetching;
  const nextDataFetching = nextProps.allData.dataFetching;
  return (
    baseMemo(prevProps, nextProps) &&
    compare(prevDataFetching, nextDataFetching)
  );
}) as typeof CheckGroupView;
