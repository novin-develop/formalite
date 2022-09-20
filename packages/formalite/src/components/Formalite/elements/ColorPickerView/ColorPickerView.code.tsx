export const ColorPickerViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.string(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "",
};

export const ColorPickerView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.ColorPickerView,
        labelProps: {
          // style: { color: "red" },
        },
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Color",
          helperText: "helper text",
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
