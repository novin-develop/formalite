import { TextFieldProps } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import {
  checkIsRequired,
  checkRegex,
  getData,
  showErrorMessage,
} from "@components/Formalite/config/utils";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { TextViewSkeleton } from "@components/Formalite/elements/Bases/SkeletonBase";

type TextFieldBaseProps<T> = {
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  mustRegex?: (RegExp | undefined)[];
  translator: Function;
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const TextFieldBase = <T extends FormikValues>(
  props: Omit<TextFieldProps, "onChange"> & TextFieldBaseProps<T>
) => {
  const {
    name,
    formik,
    loading,
    validationSchema,
    translator,
    mustRegex,
    onChange,
    ...otherProps
  } = props;
  if (loading) {
    return <TextViewSkeleton hasHelper={!!otherProps.helperText} />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (!checkRegex({ regexs: mustRegex, text: value })) {
      return;
    }

    formik.setFieldValue(name, value);
    if (onChange) {
      try {
        onChange(value, e);
      } catch (error) {
        showErrorMessage(error);
      }
    }
  };

  return (
    <TextField
      fullWidth
      name={name}
      required={checkIsRequired({
        schema: validationSchema,
        formikValues: formik.values,
        key: name,
      })}
      error={
        getData({ source: formik.touched, key: name }) &&
        Boolean(getData({ source: formik.errors, key: name }))
      }
      value={getData({ source: formik.values, key: name })}
      onChange={handleChange}
      {...otherProps}
      helperText={
        getData({ source: formik.touched, key: name }) &&
        getData({ source: formik.errors, key: name })
          ? translator(getData({ source: formik.errors, key: name }))
          : otherProps.helperText
      }
    />
  );
};
