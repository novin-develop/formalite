import React, { useMemo } from "react";
import * as Yup from "yup";
import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { TextDropZoneViewType } from "./TextDropZoneView.type";

const validation = Yup.object({
  title: Yup.object({
    text: Yup.string().required("Required"),
    files: Yup.array().min(1),
  }),
}).required();

type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: {
    text: "default text",
    files: [
      {
        preview: "https://picsum.photos/200",
        uid: "123",
      },
    ],
  },
};
const iniValueNull = {};

type TestTextDropZoneViewProps = Omit<TextDropZoneViewType, "type"> & {
  lang?: Language;
  withIni: boolean;
};

export const TestTextDropZoneView = ({
  lang = "en",
  withIni = true,
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
      initialValues={withIni ? iniValues : iniValueNull}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
