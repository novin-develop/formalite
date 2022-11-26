import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import {
  Formalite,
  MainType,
  useFormaliteRef,
  ViewTypes,
} from "@components/Formalite";
import { Fade, FormHelperText, Rating, Stack, Typography } from "@mui/material";

const validation = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  stars: Yup.number().min(2),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  first_name: "",
  last_name: "",
  stars: 0,
};
export const InsideComponent = () => {
  const formRef = useFormaliteRef<ValidationType>();
  const [showTest, setShowText] = useState(false);

  const formString = useMemo<MainType>(() => {
    return {
      first_name: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
          md: 4,
        },
        inputProps: {
          label: "First Name",
          helperText: "Helper text",
          placeholder: "First name",
        },
      },
      stars: {
        type: ViewTypes.ComponentView,
        layoutProps: {
          xs: 12,
          md: 4,
        },
        render: (name, value, onChange, error, isTouched) => (
          <Stack alignItems="center" justifyContent="center">
            <Rating
              name={name}
              value={value}
              onChange={(event, newValue) => onChange(newValue)}
            />
            {isTouched && (
              <FormHelperText error={!!error}>{error}</FormHelperText>
            )}
          </Stack>
        ),
      },
      last_name: {
        type: ViewTypes.TextView,
        layoutProps: {
          xs: 12,
          md: 4,
        },
        inputProps: {
          label: "Last Name",
          helperText: "Helper text",
          placeholder: "Last Name",
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
          setShowText(true);
          setTimeout(() => {
            setShowText(false);
          }, 300);
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
        <Fade in={showTest}>
          <Typography variant="caption" color="success.main">
            {" "}
            Submitted!
          </Typography>
        </Fade>
      </div>
    </Stack>
  );
};
