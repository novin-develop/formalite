export const DateTimePickerViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.mixed().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: new Date(),
};

export const DateTimePickerView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.DateTimePickerView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Date Time Picker",
          helperText: "helper text",
        },
        // datePickerProps: {
        //   mask: "____/__/__",
        // },
        onChange: (date) =>
          console.log("test date time Picker onChage", date),
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
