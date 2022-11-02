import React, { useMemo } from "react";
import * as Yup from "yup";
import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { TextViewType } from "./TextView.type";

const validation = Yup.object({
  title: Yup.string().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "123",
};

type TestTextViewProps = Omit<TextViewType, "type"> & {
  lang?: Language;
};

export const TestTextView = ({ lang = "en", ...props }: TestTextViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.TextView,
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
