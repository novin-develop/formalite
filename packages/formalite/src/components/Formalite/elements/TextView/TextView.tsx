import React, { useRef, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
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
import { ObjectSchema } from "yup";
import { TextViewType } from "./TextView.type";

export type TextViewProps<T> = {
  allData: TextViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
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
  const startCursor = 10000;
  const endCursor = 10000;
  const { autoComplete, type, InputProps, ...inputProps } = allData.inputProps;

  return (
    <Grid item {...allData.layoutProps}>
      <TextFieldBase
        formik={formik}
        loading={loading}
        validationSchema={validationSchema}
        translator={props.translator}
        name={String(name)}
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
                    <Tooltip title={t("textview_toggle_password_visibility")}>
                      <IconButton
                        aria-label={t("fg-toggle-password-visibility")}
                        onClick={() => {
                          setShowPassword(!showPassword);
                          if (mainRef.current) {
                            mainRef.current.blur();
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          if (mainRef.current) {
                            mainRef.current.focus();
                          }
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
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
  return baseMemo(prevProps, nextProps);
}) as typeof TextView;
