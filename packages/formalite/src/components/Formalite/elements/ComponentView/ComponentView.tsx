import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { FormikProps, FormikValues } from "formik";
import { ComponentViewType } from "@components/Formalite/elements/ComponentView/ComponentView.type";
import { getData } from "@components/Formalite/config/utils";
import { ObjectSchema } from "yup";

export type ComponentViewProps<T> = {
  allData: ComponentViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
};

const ComponentView = <T extends FormikValues>(
  props: ComponentViewProps<T>
) => {
  const { allData, name, formik, loading } = props;

  const value = getData({ source: formik.values, key: name });
  const onChange = (newValue: any) =>
    formik.setFieldValue(String(name), newValue);
  const error = getData({ source: formik.errors, key: name });
  const isTouched = getData({ source: formik.touched, key: name });

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <Skeleton variant="rectangular" animation="wave" height={55} />
      </Grid>
    );
  }
  return (
    <Grid item {...allData.layoutProps}>
      {allData.render(String(name), value, onChange, error, isTouched)}
    </Grid>
  );
};
export default React.memo(ComponentView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof ComponentView;
