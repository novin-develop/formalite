import React from "react";
import { FormikProps, FormikValues } from "formik";
import { SwitchGroupViewType } from "@components/Formalite/elements/SwitchGroupView/SwitchGroupView.type";
import { ViewTypes } from "@components/Formalite/Formalite.type";
import CheckGroupView from "@components/Formalite/elements/CheckGroupView/CheckGroupView";
import { ObjectSchema } from "yup";

export type SwitchGroupViewProps<T> = {
  allData: SwitchGroupViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
};

const SwitchGroupView = <T extends FormikValues>(
  props: SwitchGroupViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;

  return (
    <CheckGroupView<T>
      key={String(name)}
      name={String(name)}
      allData={{
        ...allData,
        type: ViewTypes.CheckGroupView,
      }}
      formik={formik}
      loading={loading}
      validationSchema={validationSchema}
      translator={translator}
      component="switch"
    />
  );
};
export default React.memo(SwitchGroupView) as typeof SwitchGroupView;
