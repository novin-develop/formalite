import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { TextDropZoneViewType } from "./TextDropZoneView.type";

const validation = Yup.object({}).required();

type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {};

type TestTextDropZoneViewProps = Omit<TextDropZoneViewType, "type"> & {
  lang?: Language;
};

export const TestTextDropZoneView = ({
  lang = "en",
  ...props
}: TestTextDropZoneViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.TextDropZoneView,
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
