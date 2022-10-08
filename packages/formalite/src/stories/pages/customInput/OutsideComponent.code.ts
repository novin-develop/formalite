export const OutsideComponentCode = `
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import {
  Formalite,
  MainType,
  useFormaliteRef,
  ViewTypes,
} from "@components/Formalite";
import { FormHelperText, Rating, Stack } from "@mui/material";

const validation = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  stars: Yup.number().min(2)
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  first_name: "",
  last_name: "",
  stars: 0
};
export const OutsideComponent = () => {
  const formRef = useFormaliteRef<ValidationType>();
  const [_, setRender] = useState(0);

  const formString = useMemo<MainType>(() => {
    return {
      first_name: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
          md: 6
        },
        inputProps: {
          label: "First Name",
          helperText: "Helper text",
          placeholder: "First name"
        }
      },
      last_name: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
          md: 6
        },
        inputProps: {
          label: "Last Name",
          helperText: "Helper text",
          placeholder: "Last Name"
        }
      }
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
        onFormChange={() => {
          setRender(new Date().getTime());
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      />
      <Rating
        name="stars"
        value={formRef.current?.formik.values.stars}
        onChange={(event, value) => {
          formRef.current?.formik.setFieldValue("stars", value);
        }}
      />
      {formRef.current?.formik.touched.stars && (
        <FormHelperText error={!!formRef.current?.formik.errors.stars}>
          {formRef.current?.formik.errors.stars}
        </FormHelperText>
      )}

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
