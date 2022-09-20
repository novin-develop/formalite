import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { RepeaterViewType } from "./RepeaterView.type";

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

type TestRepeaterViewProps = Omit<RepeaterViewType, "type"> & {
  lang?: Language;
};

export const TestRepeaterView = ({
  lang = "en",
  ...props
}: TestRepeaterViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.RepeaterView,
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
