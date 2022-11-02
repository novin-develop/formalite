import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { SelectViewType } from "./SelectView.type";

const validation = Yup.object({
  title: Yup.string().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "1",
};

type TestSelectViewProps = Omit<SelectViewType, "type"> & {
  lang?: Language;
};

export const TestSelectView = ({
  lang = "en",
  ...props
}: TestSelectViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.SelectView,
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
