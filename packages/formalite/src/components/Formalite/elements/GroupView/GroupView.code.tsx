export const GroupViewCode = `
import React, { useMemo } from "react";
import * as Yup from "yup";

import {
  Formalite,
  ViewTypes,
  useFormaliteRef
} from "@novin-dev/formalite";
import type { MainType } from "@novin-dev/formalite";

const validation = Yup.object({
  name: Yup.string().required("Required"),
  family: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  name: "Name",
  family: "Family",
  address: "Address",
};

export const RepeaterView = () => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString = useMemo<MainType>(() => {
    return {
      component: {
        type: ViewTypes.ComponentView,
        layoutProps: {
          xs: 12,
          sm: 4,
          sx: {
            display: "flex",
          },
        },
        render: () => (
          <Box
            sx={{
              display: "flex",
              border: "solid 1px",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            Normal Component
          </Box>
        ),
      },
      title: {
        type: ViewTypes.GroupView,
        layoutProps: {
          xs: 12,
          sm: 8,
        },
        options: {
          name: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Grouped Name",
            },
          },
          family: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 6,
            },
            inputProps: {
              label: "Grouped Family",
            },
          },
          address: {
            type: ViewTypes.TextView,
            layoutProps: {
              xs: 12,
            },
            inputProps: {
              label: "Grouped Address",
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
