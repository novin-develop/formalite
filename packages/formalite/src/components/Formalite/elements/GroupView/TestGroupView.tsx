import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import { Box } from "@mui/material";
import type { GroupViewType } from "./GroupView.type";

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

type TestRepeaterViewProps = Omit<GroupViewType, "type"> & {
  lang?: Language;
};

export const TestGroupView = ({
  lang = "en",
  ...props
}: TestRepeaterViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
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
      group: {
        type: ViewTypes.GroupView,
        ...props,
      },
    };
  }, [props]);

  return (
    <Formalite<ValidationType>
      lang={lang}
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
