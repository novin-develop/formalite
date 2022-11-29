import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { TextDropZoneViewType } from "./TextDropZoneView.type";

const validation = Yup.object({
  textDropZone: Yup.object({
    text: Yup.string().required("Required"),
    files: Yup.array().min(1),
  }),
}).required();

type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {};
const iniValuesWithData: ValidationType = {
  textDropZone: {
    text: "default text",
    files: [
      {
        preview: "https://picsum.photos/200",
        uid: "123",
      },
    ],
  },
};

type TestTextDropZoneViewProps = Omit<TextDropZoneViewType, "type"> & {
  lang?: Language;
  withIni: boolean;
};

export const TestTextDropZoneView = ({
  lang = "en",
  withIni = false,
  ...props
}: TestTextDropZoneViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();
  console.log("aaaa", withIni);
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
      initialValues={withIni ? iniValues : iniValuesWithData}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
