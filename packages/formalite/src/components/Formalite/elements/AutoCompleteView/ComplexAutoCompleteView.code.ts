export const ComplexAutoCompleteViewCode = `
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
  title: Yup.array().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [],
};

export const ComplexAutoCompleteView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.AutoCompleteView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Title of Complex view",
          helperText: "Helper text",
        },
        autoCompleteProps: {
          freeSolo: true,
          multiple: true,
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
export const MultipleAutoCompleteViewCode = `
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
  title: Yup.array().required(),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: [],
};

export const ComplexAutoCompleteView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.AutoCompleteView,
        layoutProps: {
          md: 6,
          xs: 12,
        },
        inputProps: {
          label: "Title of Multiple view",
          helperText: "Helper text",
        },
        autoCompleteProps: {
          freeSolo: false,
          multiple: true,
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
