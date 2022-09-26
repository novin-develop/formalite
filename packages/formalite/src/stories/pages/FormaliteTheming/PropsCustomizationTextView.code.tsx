/* eslint-disable no-useless-escape */
export const PropsCustomizationTextView = `
import React, { useMemo } from "react";
import * as Yup from "yup";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.string().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "123",
};

export const TextView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.TextView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Title Input",
          helperText: "Helper text",
          placeholder: "some other title",
          variant:"filled",
          InputProps:{
            endAdornment: <InputAdornment position="end" style={{color:"#ed6c02"}}>kg</InputAdornment>,
          },
          minRows:3,
          size:"big",
          multiline:true,
          color:"warning",
          onChange: (value) => {
            console.log(value);
          },
        },
      },
    };
  }, []);


  return (
    <Formalite<ValidationType>
      lang="en"
      formString={formString}
      initialValues={iniValues}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
`;
