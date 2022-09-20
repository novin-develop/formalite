export const RepeaterViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        family: Yup.string().required("Required"),
      })
    )
    .required("Must have friends")
    .min(2, "Minimum of 2 friends"),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [
    {
      name: "1",
      family: "1",
    },
    {
      name: "2",
      family: "2",
    },
  ],
};

export const RepeaterView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.RepeaterView,
        layoutProps: {
          xs: 12,
        },
        buttonText: "Custom text",
        options: {
          name: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Name",
            },
          },
          family: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Family",
            },
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
