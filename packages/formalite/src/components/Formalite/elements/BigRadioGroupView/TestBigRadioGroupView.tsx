import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { BigRadioGroupViewType } from "./BigRadioGroupView.type";

const validation = Yup.object({
  title: Yup.string().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "",
};

type TestBigRadioGroupViewProps = Omit<BigRadioGroupViewType, "type"> & {
  lang?: Language;
};

export const TestBigRadioGroupView = ({
  lang = "en",
  ...props
}: TestBigRadioGroupViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.BigRadioGroupView,
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
