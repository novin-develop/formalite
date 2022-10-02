export const ManuallySelectCode = `
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
  title: Yup.string().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "1",
};

export const SelectView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.SelectView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        dataFetching: {
          type: "MANUAL",
          loading: false,
          error: false,
          onRetry: () => {
            console.log("fg forever");
          },
          data: {
            one: {
              label: "one",
              description: "This is desc",
              additionalData: {
                x: 1,
                y: 2
              }
            },
            two: {
              label: "two",
              description: "that is desc"
            }
          }
        },
        inputProps: {
          label: "Select Title",
          helperText: "HelperText",
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
