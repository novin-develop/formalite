import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  FormGroup,
  Switch,
} from "@mui/material";
import { getData, checkIsRequired } from "@components/Formalite/config/utils";
import React from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  CheckGroupInputPropsType,
  CheckGroupStateEnum,
  CheckGroupStateType,
} from "@components/Formalite/elements/CheckGroupView/CheckGroupView.type";
import ViewPending from "@components/Formalite/components/ViewPending";
import ViewError from "@components/Formalite/components/ViewError";
import { ObjectSchema } from "yup";

const checkComponentMap = {
  checkbox: Checkbox,
  switch: Switch,
};

export type CheckComponentType = keyof typeof checkComponentMap;

type CheckGroupAllViewsProps<T> = {
  formik: FormikProps<T>;
  name: string;
  validationSchema: ObjectSchema<any>;
  dataStatus: CheckGroupStateType;
  allInputProps: CheckGroupInputPropsType;
  labelProps: FormLabelProps<"legend">;
  component?: CheckComponentType;
  loadFunction: () => void;
  translator: Function;
};

type CustomLabelProps = Pick<
  CheckGroupAllViewsProps<any>,
  "name" | "validationSchema" | "allInputProps" | "labelProps" | "formik"
>;

const CustomLabel = ({
  name,
  allInputProps,
  labelProps,
  formik,
  validationSchema,
}: CustomLabelProps) => {
  return (
    <FormLabel
      component="legend"
      required={checkIsRequired({
        schema: validationSchema,
        formikValues: formik.values,
        key: name,
      })}
      {...labelProps}
    >
      {allInputProps.label}
    </FormLabel>
  );
};

const CheckGroupViewAllViews = <T extends FormikValues>(
  props: CheckGroupAllViewsProps<T>
) => {
  const {
    formik,
    name,
    validationSchema,
    dataStatus,
    loadFunction,
    allInputProps,
    labelProps,
    translator,
    component = "checkbox",
  } = props;
  const TargetComponent = checkComponentMap[component];
  const { helperText, onChange, ...inputProps } = allInputProps;
  if (dataStatus.status === CheckGroupStateEnum.READY) {
    return (
      <FormControl
        component="fieldset"
        error={
          getData({ source: formik.touched, key: name }) &&
          Boolean(getData({ source: formik.errors, key: name }))
        }
        fullWidth
      >
        <CustomLabel
          validationSchema={validationSchema}
          name={name}
          allInputProps={allInputProps}
          labelProps={labelProps}
          formik={formik}
        />
        <FormGroup row {...inputProps}>
          {Object.entries(dataStatus.data).map(([key, value]) => {
            const formikValue = getData({ source: formik.values, key: name });
            return (
              <FormControlLabel
                key={key}
                value={key}
                label={value.label}
                control={
                  <TargetComponent
                    checked={formikValue?.includes(key)}
                    {...value.props}
                    name={name}
                    onChange={(event) => {
                      let arr = [...formikValue];
                      if (event.target.checked) {
                        arr.push(key);
                      } else {
                        arr = arr.filter((item) => item !== key);
                      }
                      formik.setFieldValue(name, arr);
                      if (typeof onChange === "function") {
                        onChange(arr, value.additionalData);
                      }
                    }}
                  />
                }
              />
            );
          })}
        </FormGroup>

        <FormHelperText
          data-i18n="[html]content.body"
          dangerouslySetInnerHTML={{
            __html:
              getData({ source: formik.touched, key: name }) &&
              getData({ source: formik.errors, key: name })
                ? translator(getData({ source: formik.errors, key: name }))
                : helperText,
          }}
        />
      </FormControl>
    );
  }

  if (dataStatus.status === CheckGroupStateEnum.PENDING) {
    return (
      <ViewPending
        label={
          <CustomLabel
            validationSchema={validationSchema}
            name={name}
            allInputProps={allInputProps}
            labelProps={labelProps}
            formik={formik}
          />
        }
      />
    );
  }

  return (
    <ViewError
      error={dataStatus.error}
      reloadFunction={loadFunction}
      label={
        <CustomLabel
          validationSchema={validationSchema}
          name={name}
          allInputProps={allInputProps}
          labelProps={labelProps}
          formik={formik}
        />
      }
    />
  );
};
export default CheckGroupViewAllViews;
