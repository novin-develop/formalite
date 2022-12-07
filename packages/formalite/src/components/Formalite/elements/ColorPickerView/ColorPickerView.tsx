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
import ClearIcon from "@mui/icons-material/Clear";
import { getData } from "@components/Formalite/config/utils";
import { ObjectSchema } from "yup";
import { baseMemo } from "../Bases/functions/memo";
import { TextFieldBase } from "../Bases/TextFieldBase";
import { ColorPickerViewType } from "./ColorPickerView.type";
import { ChromePickerComponent } from "./ChromePicker";

export interface ColorPickerViewProps<T> {
  allData: ColorPickerViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
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
    formik.setFieldValue(String(name), selectedColor);
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
            name={String(name)}
            InputProps={{
              startAdornment: !!colorPicked && (
                <InputAdornment position="start">
                  <ColorPickerViewStartAdornment
                    colorPicker={colorPicked}
                    data-testid="colorCircle"
                  />
                </InputAdornment>
              ),
              endAdornment: !!colorPicked && (
                <ColorPickerViewCleaner formik={formik} name={String(name)} />
              ),
              onClick: handleClick,
            }}
            {...inputProps}
          />
          <Popper
            id={id}
            open={chromePicker.isOpen}
            anchorEl={chromePicker.anchorEl}
            style={{ zIndex: 11 }}
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
  return baseMemo(prevProps, nextProps);
}) as typeof ColorPickerView;
