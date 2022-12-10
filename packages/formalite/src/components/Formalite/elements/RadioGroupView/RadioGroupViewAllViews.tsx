import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
} from "@mui/material";
import { checkIsRequired, getData } from "@components/Formalite/config/utils";
import React from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  RadioGroupInputPropsType,
  RadioGroupStateType,
  RadioGroupStateEnum,
} from "@components/Formalite/elements/RadioGroupView/RadioGroupView.type";
import ViewError from "@components/Formalite/components/ViewError";
import ViewPending from "@components/Formalite/components/ViewPending";
import { ObjectSchema } from "yup";

type RadioGroupAllViewsProps<T> = {
  formik: FormikProps<T>;
  name: string;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  dataStatus: RadioGroupStateType;
  allInputProps: RadioGroupInputPropsType;
  labelProps: FormLabelProps<"legend">;
  loadFunction: () => void;
};

type CustomLabelProps = Pick<
  RadioGroupAllViewsProps<any>,
  "name" | "validationSchema" | "allInputProps" | "labelProps" | "formik"
>;

const CustomLabel = ({
  name,
  allInputProps,
  labelProps,
  validationSchema,
  formik,
}: CustomLabelProps) => {
  return (
    <FormLabel
      data-testid="label"
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

const RadioGroupViewAllViews = <T extends FormikValues>(
  props: RadioGroupAllViewsProps<T>
) => {
  const {
    formik,
    name,
    validationSchema,
    translator,
    dataStatus,
    loadFunction,
    allInputProps,
    labelProps,
  } = props;
  const { helperText, onChange, ...inputProps } = allInputProps;
  if (dataStatus.status === RadioGroupStateEnum.READY) {
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
        <RadioGroup name={name} row {...inputProps}>
          {Object.entries(dataStatus.data).map(([key, value]) => {
            return (
              <FormControlLabel
                key={key}
                value={key}
                label={value.label}
                control={
                  <Radio
                    checked={
                      getData({ source: formik.values, key: name }) === key
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        formik.setFieldValue(name, key);
                        if (typeof onChange === "function") {
                          onChange(key, value.additionalData);
                        }
                      }
                    }}
                    {...value.props}
                  />
                }
              />
            );
          })}
        </RadioGroup>

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
  if (dataStatus.status === RadioGroupStateEnum.PENDING) {
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
export default RadioGroupViewAllViews;
