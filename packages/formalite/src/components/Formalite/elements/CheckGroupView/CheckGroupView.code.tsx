export const CheckGroupViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
  FetchingDataEnum,
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  title: Yup.array().required().min(1, "At least select one item"),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: ["one"],
};

export const CheckGroupView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.CheckGroupView,
        labelProps: {
          // style: { color: "red" },
        },
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Title",
          helperText: "HelperText",
        },
        dataFetching: {
          type: FetchingDataEnum.MANUAL,
          loading: false,
          error: false,
          onRetry: () => {
            console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
              additionalData: {
                x: 1,
                y: 2,
              },
            },
            two: {
              label: "two",
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
