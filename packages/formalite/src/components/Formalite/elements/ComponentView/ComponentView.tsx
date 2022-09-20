import { Grid, Skeleton } from "@mui/material";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { ComponentViewType } from "@components/Formalite/elements/ComponentView/ComponentView.type";
import React from "react";

type ComponentViewProps<T> = {
  allData: ComponentViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
};

const ComponentView = <T extends FormikValues>(
  props: ComponentViewProps<T>
) => {
  const { allData, name, formik, loading } = props;

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <Skeleton variant="rectangular" animation="wave" height={55} />
      </Grid>
    );
  }
  return (
    <Grid item {...allData.layoutProps}>
      {allData.render(name)}
    </Grid>
  );
};
export default React.memo(ComponentView, (prevProps, nextProps) => {
  try {
    return (
      baseMemo(prevProps, nextProps) &&
      prevProps.allData?.dependency === nextProps.allData?.dependency
    );
  } catch (e) {
    return true;
  }
}) as typeof ComponentView;
