import React, { useState } from "react";
import {
  Grid,
  ClickAwayListener,
  Popper,
  styled,
  Fade,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import ClearIcon from "@mui/icons-material/Clear";

import { getData } from "@components/Formalite/config/utils";
import { baseMemo } from "../Bases/functions/memo";
import { TextFieldBase } from "../Bases/TextFieldBase";
import { ColorPickerViewType } from "./ColorPickerView.type";
import { ChromePickerComponent } from "./ChromePicker";

interface ColorPickerViewProps<T> {
  allData: ColorPickerViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: OptionalObjectSchema<any>;
  translator: Function;
}

interface OpenColorPickerViewState {
  isOpen: boolean;
  anchorEl: (EventTarget & HTMLDivElement) | null;
}

interface ColorPickerViewStartAdornmentProps {
  colorPicker: string;
}

interface ColorPickerViewCleanerProps<T> {
  formik: FormikProps<T>;
  name: string;
}

const ColorPickerViewStartAdornment = styled("div")(
  ({ colorPicker }: ColorPickerViewStartAdornmentProps) => ({
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    marginRight: "10px",
    backgroundColor: colorPicker,
  })
) as any;

const ColorPickerViewCleaner = <T extends FormikValues>({
  formik,
  name,
}: ColorPickerViewCleanerProps<T>) => {
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    formik.setFieldValue(name, "");
  };
  return (
    <IconButton onClick={handleClear}>
      <ClearIcon />
    </IconButton>
  );
};

const ColorPickerView = <T extends FormikValues>(
  props: ColorPickerViewProps<T>
) => {
  const { allData, name, formik, loading, validationSchema, translator } =
    props;
  const { ...inputProps } = allData.inputProps;

  const [chromePicker, setChromePicker] = useState<OpenColorPickerViewState>({
    anchorEl: null,
    isOpen: false,
  });

  const handleClickAway = () => {
    if (chromePicker.isOpen) {
      setChromePicker({ anchorEl: null, isOpen: false });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setChromePicker({
      isOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  const handleColorChange = (selectedColor: string) => {
    formik.setFieldValue(name, selectedColor);
  };

  const id = chromePicker.isOpen ? "chorom-color-picker-popper" : undefined;
  const colorPicked = getData({ key: name, source: formik.values });

  return (
    <Grid item {...allData.layoutProps}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <TextFieldBase
            id={id}
            formik={formik}
            loading={loading}
            validationSchema={validationSchema}
            translator={translator}
            name={name}
            InputProps={{
              startAdornment: !!colorPicked && (
                <InputAdornment position="start">
                  <ColorPickerViewStartAdornment colorPicker={colorPicked} />
                </InputAdornment>
              ),
              endAdornment: !!colorPicked && (
                <ColorPickerViewCleaner formik={formik} name={name} />
              ),
              onClick: handleClick,
            }}
            {...inputProps}
          />
          <Popper
            id={id}
            open={chromePicker.isOpen}
            anchorEl={chromePicker.anchorEl}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={400}>
                <ChromePickerComponent
                  colorPicked={colorPicked}
                  onColorChange={handleColorChange}
                />
              </Fade>
            )}
          </Popper>
        </Box>
      </ClickAwayListener>
    </Grid>
  );
};

export default React.memo(ColorPickerView, (prevProps, nextProps) => {
  try {
    return baseMemo(prevProps, nextProps);
  } catch (e) {
    return true;
  }
}) as typeof ColorPickerView;
