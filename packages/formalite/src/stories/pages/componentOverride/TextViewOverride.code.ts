/* eslint-disable no-useless-escape */
export const TextViewOverrideCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";
import {
  Formalite,
  MainType,
  useFormaliteRef,
  ViewTypes,
} from "@components/Formalite";
import { Grid, Stack } from "@mui/material";
import { TextViewProps } from "@components/Formalite/elements/TextView/TextView";

const validation = Yup.object({
  title: Yup.string().required(),
}).required();

type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "",
};

const CustomComponent = (props: TextViewProps<ValidationType>) => {
  const { allData, name, formik, loading, validationSchema } = props;
  const {
    renderDependency,
    layoutProps,
    inputProps,
    type,
    showOnUpdate,
    mustRegex,
  } = allData;

  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <Grid item {...layoutProps}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span style={{ fontSize: "small" }}>{inputProps.label}</span>
          <input
            style={{ width: "100%" }}
            placeholder={inputProps.placeholder}
            name={name}
            value={formik.values[name]}
            onChange={(event) => {
              const { value } = event.target;
              formik.setFieldValue(name, value);
              if (inputProps.onChange) {
                inputProps.onChange(value);
              }
            }}
          />
          <span
            style={{ color: hasError ? "red" : "inherit", fontSize: "small" }}
          >
            {hasError ? formik.errors[name] : inputProps.helperText}
          </span>
        </div>
      )}
    </Grid>
  );
};

export const TextViewOverride = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      title: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
          md: 6,
        },
        inputProps: {
          label: "First Name",
          helperText: "Helper text",
          placeholder: "First name",
        },
      },
    };
  }, []);

  return (
    <Stack spacing={2}>
      <Formalite<ValidationType>
        lang="en"
        formString={formString}
        initialValues={iniValues}
        validationSchema={validation}
        formRef={formRef}
        onSubmit={(values) => {
          console.log(values);
        }}
        components={{
          TextView: CustomComponent,
        }}
      />
      <div>
        <button
          type="button"
          onClick={() => {
            formRef.current?.callSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </Stack>
  );
};
`;
