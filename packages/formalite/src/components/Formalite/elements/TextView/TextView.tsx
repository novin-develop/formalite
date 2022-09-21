import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { TextFieldBase } from "@components/Formalite/elements/Bases/TextFieldBase";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { useI18nContext } from "@components/base/I18nProvider";
import { Language } from "@components/base/model";
import { TextViewType } from "./TextView.type";

type TextViewProps<T> = {
  allData: TextViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  formMustRegex?: RegExp;
  translator: Function;
  isUpdateMode: boolean;
  lang: Language;
};

const TextView = <T extends FormikValues>(props: TextViewProps<T>) => {
  const { allData, name, formik, loading, validationSchema } = props;
  const [showPassword, setShowPassword] = useState(
    !(allData.inputProps.type === "password")
  );
  const mainRef = useRef<HTMLInputElement>();
  const { t } = useI18nContext();
  let startCursor = 10000;
  let endCursor = 10000;
  const { autoComplete, type, InputProps, ...inputProps } = allData.inputProps;

  return (
    <Grid item {...allData.layoutProps}>
      <TextFieldBase
        formik={formik}
        loading={loading}
        validationSchema={validationSchema}
        translator={props.translator}
        name={name}
        mustRegex={[allData.mustRegex, props.formMustRegex]}
        inputRef={mainRef}
        type={
          type === "password" ? `${showPassword ? "text" : "password"}` : type
        }
        autoComplete={type === "password" ? "on" : autoComplete}
        InputProps={
          allData.inputProps.type === "password"
            ? {
                ...InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={t("fg-toggle-password-visibility")}
                      onClick={() => {
                        setShowPassword(!showPassword);
                        setTimeout(() => {
                          if (mainRef.current) {
                            mainRef.current.selectionStart = startCursor;
                            mainRef.current.selectionEnd = endCursor;
                          }
                        }, 0);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        mainRef.current?.focus();
                        if (mainRef.current) {
                          startCursor = mainRef.current.selectionStart || 10000;
                          endCursor = mainRef.current?.selectionEnd || 10000;
                        }
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : { ...InputProps }
        }
        {...inputProps}
      />
    </Grid>
  );
};
export default React.memo(TextView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof TextView;
