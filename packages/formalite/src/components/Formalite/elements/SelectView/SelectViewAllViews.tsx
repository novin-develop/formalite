import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  checkIsRequired,
  getData,
  showErrorMessage,
} from "@components/Formalite/config/utils";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  SelectGroupStateType,
  SelectInputPropsType,
  SelectStateEnum,
} from "@components/Formalite/elements/SelectView/SelectView.type";
import ViewPending from "@components/Formalite/components/ViewPending";
import ViewError from "@components/Formalite/components/ViewError";
import { ObjectSchema } from "yup";

const selectSX = {
  paddingRight: 0,
  "& .MuiInputBase-input": {
    flexShrink: 0,
    boxSizing: "border-box",
  },
};
const menuItemSx = {
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
};

type SelectViewAllViewsProps<T> = {
  formik: FormikProps<T>;
  name: string;
  validationSchema: ObjectSchema<any>;
  translator: Function;
  dataStatus: SelectGroupStateType;
  allInputProps: SelectInputPropsType;
  loadFunction: () => void;
};

const SelectViewAllViews = <T extends FormikValues>(
  props: SelectViewAllViewsProps<T>
) => {
  const {
    formik,
    name,
    validationSchema,
    translator,
    dataStatus,
    loadFunction,
    allInputProps,
  } = props;
  const { label, onChange, placeholder, helperText, ...inputProps } =
    allInputProps;
  const [mouseOver, setMouseOver] = useState(false);
  if (dataStatus.status === SelectStateEnum.READY) {
    return (
      <FormControl
        required={checkIsRequired({
          schema: validationSchema,
          formikValues: formik.values,
          key: name,
        })}
        error={
          getData({ source: formik.touched, key: name }) &&
          Boolean(getData({ source: formik.errors, key: name }))
        }
        fullWidth
      >
        <InputLabel htmlFor="my-input">{label}</InputLabel>
        <Select
          name={name}
          label={label}
          displayEmpty
          value={getData({ source: formik.values, key: name })}
          onFocus={() => {
            setMouseOver(true);
          }}
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          onOpen={() => setMouseOver(false)}
          onChange={(e) => {
            const { value } = e.target;
            formik.setFieldValue(name, value);
            const selectedOption = dataStatus.data[value];
            if (onChange) {
              try {
                onChange(value, selectedOption?.additionalData);
              } catch (e2) {
                showErrorMessage(e2);
              }
            }
          }}
          renderValue={(selected) => {
            // console.log(selected)
            if (selected) {
              return dataStatus.data[selected]?.label;
            }
            return placeholder;
          }}
          {...inputProps}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  margin: "0px 8px",
                  right: "16px",
                  visibility:
                    mouseOver &&
                    !inputProps.disabled &&
                    getData({ source: formik.values, key: name }) &&
                    getData({ source: formik.values, key: name }) !== ""
                      ? "visible"
                      : "hidden",
                }}
                onClick={() => {
                  formik.setFieldValue(name, "");
                  formik.setFieldTouched(name, false);
                  if (onChange) {
                    try {
                      onChange("");
                    } catch (e2) {
                      showErrorMessage(e2);
                    }
                  }
                }}
              >
                <ClearIcon style={{ fontSize: "1.25rem" }} />
              </IconButton>
            </InputAdornment>
          }
          sx={selectSX}
        >
          {dataStatus.status === SelectStateEnum.READY &&
            Object.entries(dataStatus.data).map(([key, value]) => {
              return (
                <MenuItem
                  key={key}
                  value={key}
                  sx={menuItemSx}
                  {...value.props}
                >
                  {value.label}
                </MenuItem>
              );
            })}
        </Select>
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
  if (dataStatus.status === SelectStateEnum.PENDING) {
    return <ViewPending label={label} />;
  }
  return (
    <ViewError
      error={dataStatus?.error}
      reloadFunction={loadFunction}
      label={label}
    />
  );
};
export default SelectViewAllViews;
