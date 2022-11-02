import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { SwitchGroupViewType } from "./SwitchGroupView.type";

const validation = Yup.object({
  title: Yup.array().required().min(1, "At least select one item"),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: ["one"],
};

type TestSwitchGroupViewProps = Omit<SwitchGroupViewType, "type"> & {
  lang?: Language;
};

export const TestSwitchGroupView = ({
  lang = "en",
  ...props
}: TestSwitchGroupViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.SwitchGroupView,
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
