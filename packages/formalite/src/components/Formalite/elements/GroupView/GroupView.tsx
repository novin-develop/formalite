import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { Language } from "@components/base/model";
import { Grid } from "@mui/material";
import { itemRenderer } from "@components/Formalite/Formalite";
import React from "react";
import { GroupViewType } from "@components/Formalite/elements/GroupView/GroupView.type";

type GroupViewProps<T> = {
  allData: GroupViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
  lang: Language;
  isUpdateMode: boolean;
  formMustRegex?: RegExp;
};

const GroupView = <T extends FormikValues>(props: GroupViewProps<T>) => {
  const {
    allData,
    name,
    formik,
    loading,
    lang,
    validationSchema,
    translator,
    isUpdateMode,
    formMustRegex,
  } = props;
  return (
    <Grid item container spacing={3} {...allData.layoutProps} id={name}>
      {itemRenderer<T>({
        formMustRegex,
        form: allData.options,
        formik,
        loading,
        lang,
        isUpdateMode,
        validationSchema,
        translator,
      })}
    </Grid>
  );
};
export default GroupView;
