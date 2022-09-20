/* eslint-disable no-useless-escape */
export const SimpleTextViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

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
        mustRegex:
          /^([1-9]\d*(\.)\d{1,4}|0?(\.)\d*[1-9]\d*|0?|[1-9]\d*|[1-9]\d*(\.))$/,
        inputProps: {
          label: "Title Input",
          helperText: "Helper text",
          placeholder: "some other title",
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

export const PasswordTextViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

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
          type: "password",
          helperText: "Helper text",
          placeholder: "Password",
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
